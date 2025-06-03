
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import { Download, TrendingUp, TrendingDown, Clock, Target } from "lucide-react";

const weeklyData = [
  { week: "Week 1", productive: 28, unproductive: 14, total: 42 },
  { week: "Week 2", productive: 32, unproductive: 12, total: 44 },
  { week: "Week 3", productive: 26, unproductive: 18, total: 44 },
  { week: "Week 4", productive: 35, unproductive: 10, total: 45 }
];

const dailyTrends = [
  { day: "Mon", score: 75 },
  { day: "Tue", score: 82 },
  { day: "Wed", score: 68 },
  { day: "Thu", score: 88 },
  { day: "Fri", score: 71 },
  { day: "Sat", score: 45 },
  { day: "Sun", score: 38 }
];

const insights = [
  {
    title: "Most Productive Day",
    value: "Thursday",
    description: "Average 8.8 hours of productive time",
    trend: "up",
    icon: TrendingUp
  },
  {
    title: "Biggest Distraction",
    value: "YouTube",
    description: "6.5 hours this week",
    trend: "down",
    icon: TrendingDown
  },
  {
    title: "Best Focus Period",
    value: "9-11 AM",
    description: "Peak productivity window",
    trend: "up",
    icon: Clock
  },
  {
    title: "Weekly Goal Progress",
    value: "94%",
    description: "33 of 35 hours completed",
    trend: "up",
    icon: Target
  }
];

export const WeeklyReports = () => {
  const currentWeek = weeklyData[weeklyData.length - 1];
  const productivityScore = Math.round((currentWeek.productive / currentWeek.total) * 100);

  return (
    <div className="space-y-6">
      {/* Header with Export */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Weekly Productivity Report</h2>
          <p className="text-muted-foreground">Analysis of your productivity patterns and insights</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
                <Icon className={`h-4 w-4 ${insight.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{insight.value}</div>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Trends</CardTitle>
            <CardDescription>Productive vs unproductive time over the last 4 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              productive: { label: "Productive", color: "#10b981" },
              unproductive: { label: "Unproductive", color: "#f59e0b" }
            }} className="h-[300px]">
              <BarChart data={weeklyData}>
                <XAxis dataKey="week" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="productive" fill="#10b981" />
                <Bar dataKey="unproductive" fill="#f59e0b" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Daily Productivity Score */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Productivity Scores</CardTitle>
            <CardDescription>Your productivity percentage throughout the week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              score: { label: "Productivity Score", color: "#3b82f6" }
            }} className="h-[300px]">
              <LineChart data={dailyTrends}>
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>This Week's Summary</CardTitle>
          <CardDescription>Detailed breakdown of your productivity this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Time Distribution</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Productive Time</span>
                  <span className="font-medium text-green-600">{currentWeek.productive}h</span>
                </div>
                <Progress value={(currentWeek.productive / currentWeek.total) * 100} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Unproductive Time</span>
                  <span className="font-medium text-orange-600">{currentWeek.unproductive}h</span>
                </div>
                <Progress value={(currentWeek.unproductive / currentWeek.total) * 100} className="h-2" />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Performance Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Productivity Score</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {productivityScore}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Screen Time</span>
                  <span className="font-medium">{currentWeek.total}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Daily Average</span>
                  <span className="font-medium">{(currentWeek.total / 7).toFixed(1)}h</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Goals & Achievements</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">🎯 Goal Achieved!</p>
                  <p className="text-xs text-green-700">Exceeded 30h productive time</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">📈 Improvement</p>
                  <p className="text-xs text-blue-700">+15% from last week</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
