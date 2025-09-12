import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Mock data
const fleetStatusData = [
  { name: "Active", value: 142, color: "hsl(var(--success))" },
  { name: "Maintenance", value: 8, color: "hsl(var(--warning))" },
  { name: "Out of Service", value: 6, color: "hsl(var(--destructive))" },
];

const weeklyMilesData = [
  { day: "Mon", miles: 8500 },
  { day: "Tue", miles: 9200 },
  { day: "Wed", miles: 8800 },
  { day: "Thu", miles: 9600 },
  { day: "Fri", miles: 8300 },
  { day: "Sat", miles: 7900 },
  { day: "Sun", miles: 6800 },
];

const FleetMetrics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fleet Metrics</CardTitle>
        <CardDescription>
          Fleet utilization and performance overview
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Fleet Status Pie Chart */}
          <div>
            <h4 className="font-medium mb-3 text-foreground">Fleet Status</h4>
            <div className="flex items-center gap-6">
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fleetStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={60}
                      dataKey="value"
                    >
                      {fleetStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2">
                {fleetStatusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-foreground font-medium">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Miles Bar Chart */}
          <div>
            <h4 className="font-medium mb-3 text-foreground">Weekly Miles</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyMilesData}>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                    formatter={(value) => [`${value} miles`, "Miles"]}
                  />
                  <Bar
                    dataKey="miles"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FleetMetrics;
