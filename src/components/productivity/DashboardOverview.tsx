
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Target, Activity } from "lucide-react";
import { ProductivityChart } from "./ProductivityChart";
import { RecentActivity } from "./RecentActivity";

export const DashboardOverview = () => {
  const todayStats = {
    totalTime: 6.5,
    productiveTime: 4.2,
    unproductiveTime: 2.3,
    productivityScore: 65
  };

  const weeklyGoal = 35; // hours
  const currentWeekTotal = 28.5;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Today's Summary Cards */}
      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Time Today</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{todayStats.totalTime}h</div>
          <p className="text-xs text-muted-foreground">
            +12% from yesterday
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Productive Time</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{todayStats.productiveTime}h</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((todayStats.productiveTime / todayStats.totalTime) * 100)}% of total time
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Productivity Score</CardTitle>
          <Activity className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{todayStats.productivityScore}%</div>
          <Progress value={todayStats.productivityScore} className="mt-2" />
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
          <Target className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentWeekTotal}h</div>
          <Progress value={(currentWeekTotal / weeklyGoal) * 100} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {weeklyGoal - currentWeekTotal}h remaining
          </p>
        </CardContent>
      </Card>

      {/* Charts and Activity */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <ProductivityChart />
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-1">
        <RecentActivity />
      </div>
    </div>
  );
};
