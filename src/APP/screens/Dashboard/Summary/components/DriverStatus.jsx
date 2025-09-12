import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, MapPin } from "lucide-react";

// Mock data
const driverStatuses = [
  {
    id: 1,
    name: "John Smith",
    status: "Driving",
    location: "I-80 near Omaha, NE",
    hoursUsed: "6.5/11",
    cycleHours: "45/70",
    nextBreak: "4h 30m",
  },
  {
    id: 2,
    name: "Maria Garcia",
    status: "On Duty",
    location: "Rest Area, Miami, FL",
    hoursUsed: "2.0/11",
    cycleHours: "28/70",
    nextBreak: "9h 00m",
  },
  {
    id: 3,
    name: "Robert Johnson",
    status: "Off Duty",
    location: "Phoenix, AZ",
    hoursUsed: "0/11",
    cycleHours: "35/70",
    nextBreak: "11h 00m",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    status: "Driving",
    location: "I-95 near Jacksonville, FL",
    hoursUsed: "9.2/11",
    cycleHours: "62/70",
    nextBreak: "1h 48m",
  },
];

const statusColors = {
  Driving: "bg-primary/10 text-primary",
  "On Duty": "bg-warning/10 text-warning",
  "Off Duty": "bg-muted text-muted-foreground",
};

const DriverStatus = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Status</CardTitle>
        <CardDescription>
          Real-time driver status and HOS compliance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {driverStatuses.map((driver) => (
            <div
              key={driver.id}
              className="flex items-center gap-4 p-3 border border-border rounded-lg"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {driver.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-foreground truncate">
                    {driver.name}
                  </p>
                  <Badge className={statusColors[driver.status]}>
                    {driver.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{driver.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">Daily: </span>
                    <span className="font-medium text-foreground">
                      {driver.hoursUsed}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cycle: </span>
                    <span className="font-medium text-foreground">
                      {driver.cycleHours}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{driver.nextBreak}</span>
                </div>
                <p className="text-xs text-muted-foreground">next break</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverStatus;
