import { motion } from "framer-motion";
import {
  Users,
  Truck,
  MapPin,
  Clock,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import KPICard from "./components/KPICard";
import RecentTrips from "./components/RecentTrips";
import DriverStatus from "./components/DriverStatus";
import FleetMetrics from "./components/FleetMetrics";
import useAxios from "@/hooks/use-axios";
import { useEffect, useState } from "react";

// Mock data
const kpiData = [
  {
    title: "Total Trips",
    value: "1,247",
    icon: MapPin,
    description: "This month",
  },
  {
    title: "Active Drivers",
    value: "89",
    change: "+3",
    icon: Users,
    description: "Currently on duty",
  },
  {
    title: "Fleet Trucks",
    value: "156",
    icon: Truck,
    description: "Total fleet size",
  },
  {
    title: "Total Miles",
    value: "45,892",
    icon: TrendingUp,
    description: "This month",
  },
];

const alertsData = [
  {
    id: 1,
    type: "warning",
    title: "Driver Hours Alert",
    message: "John Smith approaching 70-hour limit",
    time: "10 minutes ago",
  },
  {
    id: 2,
    type: "info",
    title: "Maintenance Due",
    message: "Truck #156 scheduled for service",
    time: "2 hours ago",
  },
  {
    id: 3,
    type: "success",
    title: "Trip Completed",
    message: "Chicago to Denver delivery completed",
    time: "3 hours ago",
  },
];

const Dashboard = () => {
  const request = useAxios();

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTrips();
  }, []);

  async function getTrips() {
    let res = await request({
      method: "GET",
      url: "trips/",
      show_loading: false,
    });

    if (res?.error) return;
    setTrips(res);
  }

  return (
    <div className="space-y-6 m-5">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-2">
          Monitor your fleet operations and compliance status
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-2 max-md:grid-cols-1">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <KPICard {...kpi} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Trips */}
        <div className="lg:col-span-2">
          <RecentTrips trips={trips} />
        </div>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Alerts & Notifications
            </CardTitle>
            <CardDescription>Recent system alerts and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alertsData.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <Badge
                  variant={
                    alert.type === "warning"
                      ? "destructive"
                      : alert.type === "success"
                      ? "success"
                      : "secondary"
                  }
                  className="mt-1 px-2 py-1 text-xs"
                >
                  {alert.type}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">
                    {alert.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {alert.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DriverStatus />
        <FleetMetrics />
      </div>
    </div>
  );
};

export default Dashboard;
