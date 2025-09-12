import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  MoreHorizontal,
  Fuel,
  MapPin,
  Wrench,
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
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock trucks data
const trucksData = [
  {
    id: 1,
    truckNumber: "TRK-156",
    make: "Freightliner",
    model: "Cascadia",
    year: 2021,
    vin: "1FUJBBCK3DLBX1234",
    status: "Active",
    currentDriver: "John Smith",
    currentTrip: "TRP-001",
    location: "I-80 near Omaha, NE",
    fuelLevel: 85,
    mileage: 245680,
    nextMaintenance: "2024-02-15",
    maintenanceDue: "Oil Change",
  },
  {
    id: 2,
    truckNumber: "TRK-203",
    make: "Kenworth",
    model: "T680",
    year: 2020,
    vin: "1XKWD49X5KJ123456",
    status: "Active",
    currentDriver: "Maria Garcia",
    currentTrip: "TRP-002",
    location: "Rest Area, Miami, FL",
    fuelLevel: 42,
    mileage: 189540,
    nextMaintenance: "2024-01-28",
    maintenanceDue: "DOT Inspection",
  },
  {
    id: 3,
    truckNumber: "TRK-089",
    make: "Peterbilt",
    model: "579",
    year: 2022,
    vin: "1XP5DB9X1ND123789",
    status: "Maintenance",
    currentDriver: null,
    currentTrip: null,
    location: "Service Center, Phoenix, AZ",
    fuelLevel: 95,
    mileage: 156230,
    nextMaintenance: "2024-01-20",
    maintenanceDue: "Brake Service",
  },
  {
    id: 4,
    truckNumber: "TRK-324",
    make: "Volvo",
    model: "VNL",
    year: 2019,
    vin: "4V4NC9EJ4KN654321",
    status: "Available",
    currentDriver: null,
    currentTrip: null,
    location: "Terminal, Atlanta, GA",
    fuelLevel: 78,
    mileage: 298750,
    nextMaintenance: "2024-03-10",
    maintenanceDue: "Annual Inspection",
  },
];

const statusColors = {
  Active: "status-active",
  Available: "bg-primary/10 text-primary",
  Maintenance: "status-warning",
  "Out of Service": "status-inactive",
};

const getFuelColor = (level) => {
  if (level > 50) return "bg-success";
  if (level > 25) return "bg-warning";
  return "bg-destructive";
};

const Trucks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrucks, setFilteredTrucks] = useState(trucksData);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = trucksData.filter(
      (truck) =>
        truck.truckNumber.toLowerCase().includes(value.toLowerCase()) ||
        truck.make.toLowerCase().includes(value.toLowerCase()) ||
        truck.model.toLowerCase().includes(value.toLowerCase()) ||
        truck.vin.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTrucks(filtered);
  };

  return (
    <div className="space-y-6 m-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fleet Trucks</h1>
          <p className="text-muted-foreground mt-2">
            Manage your fleet vehicles and monitor their status
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Truck
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search trucks by number, make, model, or VIN..."
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

      {/* Trucks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrucks.map((truck, index) => (
          <motion.div
            key={truck.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {truck.truckNumber}
                    </CardTitle>
                    <CardDescription>
                      {truck.year} {truck.make} {truck.model}
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[truck.status]}>
                      {truck.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Truck</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuItem>
                          Schedule Maintenance
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Mark Out of Service
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Current Assignment */}
                  {truck.currentDriver && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Current Driver
                      </div>
                      <div className="font-medium text-foreground">
                        {truck.currentDriver}
                      </div>
                      {truck.currentTrip && (
                        <div className="text-sm text-muted-foreground">
                          Trip: {truck.currentTrip}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Location */}
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Current Location
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {truck.location}
                      </div>
                    </div>
                  </div>

                  {/* Fuel Level */}
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          Fuel Level
                        </span>
                        <span className="font-medium text-foreground">
                          {truck.fuelLevel}%
                        </span>
                      </div>
                      <Progress value={truck.fuelLevel} className="h-2" />
                    </div>
                  </div>

                  {/* Mileage */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Mileage
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {truck.mileage.toLocaleString()} mi
                    </span>
                  </div>

                  {/* Maintenance */}
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <Wrench className="h-4 w-4 text-warning mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">
                        {truck.maintenanceDue}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Due: {truck.nextMaintenance}
                      </div>
                    </div>
                  </div>

                  {/* VIN */}
                  <div className="pt-2 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      VIN: {truck.vin}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTrucks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              No trucks found matching your search criteria.
            </div>
            <Button variant="outline" onClick={() => handleSearch("")}>
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Trucks;
