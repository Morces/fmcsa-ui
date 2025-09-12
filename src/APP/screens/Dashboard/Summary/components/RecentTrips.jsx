import { motion } from "framer-motion";
import { MapPin, Clock, User, Truck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data
const recentTrips = [
  {
    id: "TRP-001",
    driver: "John Smith",
    truck: "TRK-156",
    origin: "Chicago, IL",
    destination: "Denver, CO",
    status: "In Transit",
    progress: 65,
    estimatedArrival: "2024-01-15 14:30",
    distance: "920 miles",
  },
  {
    id: "TRP-002",
    driver: "Maria Garcia",
    truck: "TRK-203",
    origin: "Atlanta, GA",
    destination: "Miami, FL",
    status: "Completed",
    progress: 100,
    estimatedArrival: "2024-01-14 18:45",
    distance: "650 miles",
  },
  {
    id: "TRP-003",
    driver: "Robert Johnson",
    truck: "TRK-089",
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ",
    status: "Planning",
    progress: 0,
    estimatedArrival: "2024-01-16 10:00",
    distance: "370 miles",
  },
];

const statusColors = {
  Planning: "bg-muted text-muted-foreground",
  "In Transit": "bg-primary/10 text-primary",
  Completed: "bg-success/10 text-success",
  Delayed: "bg-warning/10 text-warning",
};

const RecentTrips = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Trips</CardTitle>
            <CardDescription>
              Latest fleet activities and trip status
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All Trips
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="font-medium text-foreground">{trip.id}</div>
                  <Badge className={statusColors[trip.status]}>
                    {trip.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {trip.distance}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{trip.driver}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{trip.truck}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {trip.origin} → {trip.destination}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  ETA: {trip.estimatedArrival}
                </div>

                {trip.status === "In Transit" && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2 w-24">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${trip.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-2 bg-primary rounded-full"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {trip.progress}%
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTrips;
