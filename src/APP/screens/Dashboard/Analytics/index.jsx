import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import KPICard from "../Summary/components/KPICard";
import {
  TrendingUp,
  Clock,
  Users,
  Truck,
  MapPin,
  DollarSign,
} from "lucide-react";

// Mock analytics data
const kpiData = [
  {
    title: "Total Revenue",
    value: "$2.8M",
    change: "+15%",
    changeType: "positive",
    icon: DollarSign,
    description: "This quarter",
  },
  {
    title: "Avg Trip Time",
    value: "18.5h",
    change: "-2.3h",
    changeType: "positive",
    icon: Clock,
    description: "Per trip",
  },
  {
    title: "Fleet Utilization",
    value: "89%",
    change: "+5%",
    changeType: "positive",
    icon: Truck,
    description: "Active trucks",
  },
  {
    title: "Driver Efficiency",
    value: "94%",
    change: "+3%",
    changeType: "positive",
    icon: Users,
    description: "Performance score",
  },
];

const monthlyTripsData = [
  { month: "Jul", trips: 145, miles: 89500, revenue: 285000 },
  { month: "Aug", trips: 162, miles: 95200, revenue: 310000 },
  { month: "Sep", trips: 178, miles: 102300, revenue: 335000 },
  { month: "Oct", trips: 156, miles: 98700, revenue: 320000 },
  { month: "Nov", trips: 189, miles: 115600, revenue: 375000 },
  { month: "Dec", trips: 203, miles: 125400, revenue: 410000 },
];

const driverPerformanceData = [
  { name: "John Smith", trips: 28, onTimeDelivery: 96, hoursCompliance: 100 },
  { name: "Maria Garcia", trips: 32, onTimeDelivery: 94, hoursCompliance: 98 },
  {
    name: "Robert Johnson",
    trips: 26,
    onTimeDelivery: 89,
    hoursCompliance: 95,
  },
  { name: "Sarah Wilson", trips: 30, onTimeDelivery: 97, hoursCompliance: 100 },
  { name: "Michael Brown", trips: 24, onTimeDelivery: 91, hoursCompliance: 92 },
];

const hosDistributionData = [
  { name: "Driving", hours: 245, color: "hsl(var(--primary))" },
  { name: "On Duty", hours: 156, color: "hsl(var(--warning))" },
  { name: "Off Duty", hours: 623, color: "hsl(var(--success))" },
];

const routeEfficiencyData = [
  { route: "Chicago-Denver", trips: 45, avgTime: 18.5, efficiency: 92 },
  { route: "Atlanta-Miami", trips: 38, avgTime: 12.2, efficiency: 89 },
  { route: "LA-Phoenix", trips: 52, avgTime: 8.3, efficiency: 94 },
  { route: "Dallas-Houston", trips: 41, avgTime: 4.8, efficiency: 96 },
  { route: "NYC-Boston", trips: 33, avgTime: 6.2, efficiency: 88 },
];

const Analytics = () => {
  return (
    <div className="space-y-6 m-5">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive fleet performance insights and metrics
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

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex gap-3 w-full max-md:flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trips Trend */}
            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Monthly Trips & Revenue</CardTitle>
                <CardDescription>
                  Trip volume and revenue trends over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTripsData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="month"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        yAxisId="trips"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        yAxisId="revenue"
                        orientation="right"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                      <Area
                        yAxisId="trips"
                        type="monotone"
                        dataKey="trips"
                        stackId="1"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                      <Line
                        yAxisId="revenue"
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--success))"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* HOS Distribution */}
            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Hours of Service Distribution</CardTitle>
                <CardDescription>
                  Driver time allocation breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-8">
                  <div className="w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={hosDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="hours"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {hosDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    {hosDistributionData.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <div className="font-medium text-foreground">
                            {item.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.hours} hours
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Drivers Tab */}
        <TabsContent value="drivers" className="space-y-6">
          <Card className="chart-container">
            <CardHeader>
              <CardTitle>Driver Performance Metrics</CardTitle>
              <CardDescription>
                On-time delivery and compliance rates by driver
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={driverPerformanceData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="name"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Bar
                      dataKey="onTimeDelivery"
                      fill="hsl(var(--primary))"
                      name="On-Time %"
                    />
                    <Bar
                      dataKey="hoursCompliance"
                      fill="hsl(var(--success))"
                      name="HOS Compliance %"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Routes Tab */}
        <TabsContent value="routes" className="space-y-6">
          <Card className="chart-container">
            <CardHeader>
              <CardTitle>Route Efficiency Analysis</CardTitle>
              <CardDescription>
                Performance metrics for top routes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={routeEfficiencyData} layout="horizontal">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      type="number"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      type="category"
                      dataKey="route"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      width={120}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Bar
                      dataKey="efficiency"
                      fill="hsl(var(--primary))"
                      name="Efficiency %"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="kpi-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      HOS Violations
                    </p>
                    <p className="text-2xl font-bold text-foreground">3</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="kpi-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Safety Score
                    </p>
                    <p className="text-2xl font-bold text-foreground">96.8%</p>
                    <p className="text-xs text-muted-foreground">
                      Fleet average
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-success/10 text-success">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="kpi-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      DOT Inspections
                    </p>
                    <p className="text-2xl font-bold text-foreground">12</p>
                    <p className="text-xs text-muted-foreground">
                      Passed this quarter
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Truck className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
