import { useState } from "react";
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

// Mock trips data
const tripsData = [
  {
    id: "TRP-001",
    driver: "John Smith",
    truck: "TRK-156",
    origin: "Chicago, IL",
    destination: "Denver, CO",
    status: "In Transit",
    progress: 65,
    startDate: "2024-01-14 08:00",
    estimatedArrival: "2024-01-15 14:30",
    distance: "920 miles",
    load: "Electronics - 35,000 lbs",
    priority: "High",
  },
  {
    id: "TRP-002",
    driver: "Maria Garcia",
    truck: "TRK-203",
    origin: "Atlanta, GA",
    destination: "Miami, FL",
    status: "Completed",
    progress: 100,
    startDate: "2024-01-13 06:00",
    estimatedArrival: "2024-01-14 18:45",
    distance: "650 miles",
    load: "Automotive Parts - 28,000 lbs",
    priority: "Standard",
  },
  {
    id: "TRP-003",
    driver: "Robert Johnson",
    truck: "TRK-089",
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ",
    status: "Planning",
    progress: 0,
    startDate: "2024-01-16 09:00",
    estimatedArrival: "2024-01-16 19:00",
    distance: "370 miles",
    load: "Consumer Goods - 42,000 lbs",
    priority: "Standard",
  },
  {
    id: "TRP-004",
    driver: "Sarah Wilson",
    truck: "TRK-324",
    origin: "Dallas, TX",
    destination: "Houston, TX",
    status: "Delayed",
    progress: 30,
    startDate: "2024-01-14 12:00",
    estimatedArrival: "2024-01-15 08:00",
    distance: "240 miles",
    load: "Food Products - 31,500 lbs",
    priority: "High",
  },
];

const statusColors = {
  Planning: "bg-muted text-muted-foreground",
  "In Transit": "bg-primary/10 text-primary",
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
  const [filteredTrips, setFilteredTrips] = useState(tripsData);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = tripsData.filter(
      (trip) =>
        trip.id.toLowerCase().includes(value.toLowerCase()) ||
        trip.driver.toLowerCase().includes(value.toLowerCase()) ||
        trip.truck.toLowerCase().includes(value.toLowerCase()) ||
        trip.origin.toLowerCase().includes(value.toLowerCase()) ||
        trip.destination.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTrips(filtered);
  };

  const filterByStatus = (status) => {
    setActiveTab(status);
    if (status === "all") {
      setFilteredTrips(tripsData);
    } else {
      const filtered = tripsData.filter(
        (trip) => trip.status.toLowerCase().replace(" ", "-") === status
      );
      setFilteredTrips(filtered);
    }
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
        <Button className="gap-2">
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
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="in-transit">In Transit</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="delayed">Delayed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Trips List */}
          <div className="space-y-4">
            {filteredTrips.map((trip, index) => (
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
                          <CardTitle className="text-lg">{trip.id}</CardTitle>
                          <CardDescription>{trip.load}</CardDescription>
                        </div>
                        <Badge className={statusColors[trip.status]}>
                          {trip.status}
                        </Badge>
                        <Badge className={priorityColors[trip.priority]}>
                          {trip.priority} Priority
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">
                          {trip.distance}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Distance
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
                              {trip.origin}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">To: </span>
                            <span className="font-medium text-foreground">
                              {trip.destination}
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
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {trip.driver
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-foreground">
                              {trip.driver}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">
                              {trip.truck}
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
                              {trip.startDate}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">ETA: </span>
                            <span className="font-medium text-foreground">
                              {trip.estimatedArrival}
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
                            {trip.progress}%
                          </span>
                        </div>
                        <Progress value={trip.progress} className="h-2" />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-6 flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Track Route
                      </Button>
                      {trip.status === "Planning" && (
                        <Button size="sm">Start Trip</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
    </div>
  );
};

export default Trips;
