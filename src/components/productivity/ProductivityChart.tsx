
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const chartConfig = {
  productive: {
    label: "Productive",
    color: "#10b981"
  },
  unproductive: {
    label: "Unproductive", 
    color: "#f59e0b"
  }
};

const weeklyData = [
  { day: "Mon", productive: 6.5, unproductive: 2.1 },
  { day: "Tue", productive: 7.2, unproductive: 1.8 },
  { day: "Wed", productive: 5.8, unproductive: 3.2 },
  { day: "Thu", productive: 8.1, unproductive: 1.5 },
  { day: "Fri", productive: 6.9, unproductive: 2.4 },
  { day: "Sat", productive: 3.2, unproductive: 4.8 },
  { day: "Sun", productive: 2.1, unproductive: 5.2 }
];

const categoryData = [
  { name: "Development", value: 35, color: "#3b82f6" },
  { name: "Learning", value: 25, color: "#10b981" },
  { name: "Social Media", value: 20, color: "#f59e0b" },
  { name: "Entertainment", value: 15, color: "#ef4444" },
  { name: "Other", value: 5, color: "#8b5cf6" }
];

export const ProductivityChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Productivity Overview</CardTitle>
        <CardDescription>
          Your productivity trends over the past week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Area Chart */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Daily Time Distribution</h4>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <AreaChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="productive" 
                  stackId="1"
                  stroke={chartConfig.productive.color}
                  fill={chartConfig.productive.color}
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="unproductive" 
                  stackId="1"
                  stroke={chartConfig.unproductive.color}
                  fill={chartConfig.unproductive.color}
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </div>

          {/* Pie Chart */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Time by Category</h4>
            <div className="h-[200px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
