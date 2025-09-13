import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  User,
  Truck,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router";
import useAxios from "@/hooks/use-axios";
import { ClipLoader } from "react-spinners";
import TrackRoute from "./components/TrackRoute";
import ViewLogs from "./components/ViewLogs";

// Mock trips data

const statusColors = {
  Planned: "bg-muted text-muted-foreground",
  "In Progress": "bg-primary/10 text-primary",
  Completed: "bg-success/10 text-success",
  Delayed: "bg-destructive/10 text-destructive",
  Cancelled: "bg-muted text-muted-foreground",
};

const priorityColors = {
  High: "bg-destructive/10 text-destructive",
  Standard: "bg-muted text-muted-foreground",
  Low: "bg-success/10 text-success",
};

const Trips = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredTrips, setFilteredTrips] = useState([]);

  const [showTrack, setShowTrack] = useState(false);

  const [showView, setShowView] = useState(false);

  const [trip, setTrip] = useState({});

  const [loading, setLoading] = useState(false);

  const request = useAxios();

  const navigate = useNavigate();

  useEffect(() => {
    getTrips();
  }, []);

  async function getTrips() {
    setLoading(true);
    let res = await request({
      method: "GET",
      url: "trips/",
      show_loading: false,
    });

    if (res?.error) {
      setLoading(false);
      return;
    }
    setLoading(false);
    setFilteredTrips(res);
  }

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = filteredTrips.filter(
      (trip) =>
        trip.driver?.name.toLowerCase().includes(value.toLowerCase()) ||
        trip.truck?.plate_number?.toLowerCase().includes(value.toLowerCase()) ||
        trip.origin?.name.toLowerCase().includes(value.toLowerCase()) ||
        trip.destination?.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTrips(filtered);
  };

  const filterByStatus = (status) => {
    setActiveTab(status);
    if (status === "all") {
      setFilteredTrips(filteredTrips);
    } else {
      const filtered = filteredTrips.filter(
        (trip) => trip.status.toLowerCase().replace(" ", "-") === status
      );
      setFilteredTrips(filtered);
    }
  };

  const handleTrack = (trip) => {
    setTrip(trip);
    setShowTrack(true);
  };

  const handleView = (trip) => {
    setTrip(trip);
    setShowView(true);
  };

  return (
    <div className="space-y-6 m-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trips</h1>
          <p className="text-muted-foreground mt-2">
            Plan, track, and manage your fleet trips
          </p>
        </div>
        <Button className="gap-2" onClick={() => navigate("add")}>
          <Plus className="h-4 w-4" />
          Create Trip
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search trips by ID, driver, truck, or location..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">Export</Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <Tabs value={activeTab} onValueChange={filterByStatus}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Trips</TabsTrigger>
          <TabsTrigger value="planned">Planned</TabsTrigger>
          <TabsTrigger value="In Progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Trips List */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center w-full flex-col gap-4">
                <ClipLoader loading={loading} />
              </div>
            ) : (
              filteredTrips?.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            {/* <CardTitle className="text-lg">{trip.id}</CardTitle> */}
                            {/* <CardDescription>{trip.load}</CardDescription> */}
                          </div>
                          <Badge className={statusColors[trip.status]}>
                            {trip?.status}
                          </Badge>
                          {/* <Badge className={priorityColors[trip.priority]}>
                          {trip.priority} Priority
                        </Badge> */}
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-foreground">
                            {trip?.route_distance_miles}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Distance(Miles)
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Route */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            Route
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm">
                              <span className="text-muted-foreground">
                                From:{" "}
                              </span>
                              <span className="font-medium text-foreground">
                                {trip?.pickup_location?.name || "--"}
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">
                                To:{" "}
                              </span>
                              <span className="font-medium text-foreground">
                                {trip?.dropoff_location?.name || "--"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Assignment */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            Assignment
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">
                                {trip?.driver?.name || "--"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-foreground">
                                {trip?.truck?.plate_number}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            Timeline
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm">
                              <span className="text-muted-foreground">
                                Started:{" "}
                              </span>
                              <span className="font-medium text-foreground">
                                {trip?.start_date}
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">
                                Duration(Hrs):{" "}
                              </span>
                              <span className="font-medium text-foreground">
                                {trip?.route_duration_hours}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {trip.status === "In Transit" && (
                        <div className="mt-6 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Progress
                            </span>
                            <span className="font-medium text-foreground">
                              {trip?.progress || 0}%
                            </span>
                          </div>
                          <Progress
                            value={trip?.progress || 0}
                            className="h-2"
                          />
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-6 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(trip)}
                        >
                          View Logs
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTrack(trip)}
                        >
                          Track Route
                        </Button>
                        {trip.status === "Planning" && (
                          <Button size="sm">Start Trip</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* Empty State */}
          {filteredTrips.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-muted-foreground mb-4">
                  No trips found matching your criteria.
                </div>
                <Button variant="outline" onClick={() => handleSearch("")}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <TrackRoute
        showTrack={showTrack}
        setShowTrack={setShowTrack}
        trip={trip}
      />

      <ViewLogs showView={showView} setShowView={setShowView} trip={trip} />
    </div>
  );
};

export default Trips;
