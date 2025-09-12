import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, MoreHorizontal, Phone, Mail } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClipLoader from "react-spinners/ClipLoader";
import useAxios from "@/hooks/use-axios";
import AddModal from "./components/AddModal";

// Mock drivers data
const driversData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "(555) 123-4567",
    licenseNumber: "DL123456789",
    status: "Active",
    currentTrip: "TRP-001",
    hoursUsed: "6.5/11",
    cycleHours: "45/70",
    joinDate: "2022-03-15",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@company.com",
    phone: "(555) 234-5678",
    licenseNumber: "DL987654321",
    status: "Active",
    currentTrip: "TRP-002",
    hoursUsed: "2.0/11",
    cycleHours: "28/70",
    joinDate: "2023-01-20",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@company.com",
    phone: "(555) 345-6789",
    licenseNumber: "DL456789123",
    status: "Off Duty",
    currentTrip: null,
    hoursUsed: "0/11",
    cycleHours: "35/70",
    joinDate: "2021-11-08",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    phone: "(555) 456-7890",
    licenseNumber: "DL789123456",
    status: "Active",
    currentTrip: "TRP-003",
    hoursUsed: "9.2/11",
    cycleHours: "62/70",
    joinDate: "2022-07-12",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@company.com",
    phone: "(555) 567-8901",
    licenseNumber: "DL321654987",
    status: "Inactive",
    currentTrip: null,
    hoursUsed: "0/11",
    cycleHours: "15/70",
    joinDate: "2023-05-30",
  },
];

const statusColors = {
  Active: "status-active",
  "Off Duty": "status-warning",
  Inactive: "status-inactive",
};

const Drivers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const refetchDrivers = () => getDrivers();

  const request = useAxios();

  useEffect(() => {
    getDrivers();
  }, []);

  async function getDrivers() {
    setLoading(true);

    let res = await request({
      method: "GET",
      url: "drivers/",
      show_loading: false,
    });

    if (res?.error) {
      setLoading(false);
      return;
    }

    setLoading(false);
    setFilteredDrivers(res);
  }

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = driversData.filter(
      (driver) =>
        driver.name.toLowerCase().includes(value.toLowerCase()) ||
        driver.email.toLowerCase().includes(value.toLowerCase()) ||
        driver.licenseNumber.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDrivers(filtered);
  };

  return (
    <div className="space-y-6 m-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Drivers</h1>
          <p className="text-muted-foreground mt-2">
            Manage your fleet drivers and monitor their status
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowAdd(true)}>
          <Plus className="h-4 w-4" />
          Add Driver
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search drivers by name, email, or license..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Grid */}

      <div className="">
        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader loading={loading} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrivers.map((driver, index) => (
              <motion.div
                key={driver.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {driver.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {driver.name}
                          </CardTitle>
                          <CardDescription>
                            {driver.license_number}
                          </CardDescription>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Driver</DropdownMenuItem>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Assign Trip</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Status
                        </span>
                        <Badge className={statusColors[driver.status]}>
                          {driver.status}
                        </Badge>
                      </div> */}

                      {/* {driver.currentTrip && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Current Trip
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {driver.currentTrip}
                          </span>
                        </div>
                      )} */}

                      {/* <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Daily Hours
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {driver.hoursUsed}
                        </span>
                      </div> */}

                      {/* <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Cycle Hours
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {driver.cycleHours}
                        </span>
                      </div> */}

                      <div className="pt-3 border-t border-border space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          {driver.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          {driver.phone}
                        </div>
                      </div>

                      <div className="pt-3">
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredDrivers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              No drivers found matching your search criteria.
            </div>
            <Button variant="outline" onClick={() => handleSearch("")}>
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}

      <AddModal
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        refetchDrivers={refetchDrivers}
      />
    </div>
  );
};

export default Drivers;
