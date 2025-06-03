
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, Clock, AlertTriangle, CheckCircle, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const GoalSettings = () => {
  const [goals, setGoals] = useState({
    weeklyProductiveHours: 35,
    dailyProductiveHours: 5,
    maxUnproductiveHours: 2,
    productivityScore: 70
  });

  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    unproductiveWarnings: true,
    goalAchievements: true,
    weeklyReports: true
  });

  const [currentProgress] = useState({
    weeklyProductive: 28.5,
    dailyProductive: 4.2,
    todayUnproductive: 1.8,
    currentScore: 72
  });

  const { toast } = useToast();

  const saveGoals = () => {
    toast({
      title: "Goals Updated",
      description: "Your productivity goals have been saved successfully"
    });
  };

  const saveNotifications = () => {
    toast({
      title: "Notifications Updated", 
      description: "Your notification preferences have been saved"
    });
  };

  const goalItems = [
    {
      title: "Weekly Productive Hours",
      current: currentProgress.weeklyProductive,
      target: goals.weeklyProductiveHours,
      unit: "hours",
      color: "blue"
    },
    {
      title: "Daily Productive Hours",
      current: currentProgress.dailyProductive, 
      target: goals.dailyProductiveHours,
      unit: "hours",
      color: "green"
    },
    {
      title: "Productivity Score",
      current: currentProgress.currentScore,
      target: goals.productivityScore,
      unit: "%",
      color: "purple"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Current Progress */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Goal Progress
          </CardTitle>
          <CardDescription>
            Your current progress towards set goals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {goalItems.map((item, index) => {
            const progress = (item.current / item.target) * 100;
            const isAchieved = progress >= 100;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  {isAchieved && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{item.current} {item.unit}</span>
                  <span>{item.target} {item.unit}</span>
                </div>
                <Progress 
                  value={Math.min(progress, 100)} 
                  className="h-2"
                />
                <Badge 
                  variant={isAchieved ? "default" : "secondary"}
                  className={isAchieved ? "bg-green-100 text-green-800" : ""}
                >
                  {Math.round(progress)}% Complete
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Goal Settings */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Productivity Goals
          </CardTitle>
          <CardDescription>
            Set your productivity targets and limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weekly-hours">Weekly Productive Hours</Label>
            <Input
              id="weekly-hours"
              type="number"
              value={goals.weeklyProductiveHours}
              onChange={(e) => setGoals({...goals, weeklyProductiveHours: Number(e.target.value)})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="daily-hours">Daily Productive Hours</Label>
            <Input
              id="daily-hours"
              type="number"
              value={goals.dailyProductiveHours}
              onChange={(e) => setGoals({...goals, dailyProductiveHours: Number(e.target.value)})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-unproductive">Max Unproductive Hours/Day</Label>
            <Input
              id="max-unproductive"
              type="number"
              value={goals.maxUnproductiveHours}
              onChange={(e) => setGoals({...goals, maxUnproductiveHours: Number(e.target.value)})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-score">Target Productivity Score (%)</Label>
            <Input
              id="target-score"
              type="number"
              min="0"
              max="100"
              value={goals.productivityScore}
              onChange={(e) => setGoals({...goals, productivityScore: Number(e.target.value)})}
            />
          </div>

          <Button onClick={saveGoals} className="w-full">
            Save Goals
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Configure alerts and reminders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="daily-reminders">Daily Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get reminded about your daily goals
              </p>
            </div>
            <Switch
              id="daily-reminders"
              checked={notifications.dailyReminders}
              onCheckedChange={(checked) => 
                setNotifications({...notifications, dailyReminders: checked})
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="unproductive-warnings">Unproductive Warnings</Label>
              <p className="text-sm text-muted-foreground">
                Alert when exceeding unproductive time
              </p>
            </div>
            <Switch
              id="unproductive-warnings"
              checked={notifications.unproductiveWarnings}
              onCheckedChange={(checked) => 
                setNotifications({...notifications, unproductiveWarnings: checked})
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="goal-achievements">Goal Achievements</Label>
              <p className="text-sm text-muted-foreground">
                Celebrate when you reach your goals
              </p>
            </div>
            <Switch
              id="goal-achievements"
              checked={notifications.goalAchievements}
              onCheckedChange={(checked) => 
                setNotifications({...notifications, goalAchievements: checked})
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-reports">Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">
                Receive weekly productivity summaries
              </p>
            </div>
            <Switch
              id="weekly-reports"
              checked={notifications.weeklyReports}
              onCheckedChange={(checked) => 
                setNotifications({...notifications, weeklyReports: checked})
              }
            />
          </div>

          <Button onClick={saveNotifications} className="w-full" variant="outline">
            Save Preferences
          </Button>

          {/* Current Status */}
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Today's Status</h4>
            <div className="space-y-2 text-sm">
              {currentProgress.todayUnproductive > goals.maxUnproductiveHours && (
                <div className="p-2 bg-orange-50 border border-orange-200 rounded text-orange-800">
                  ⚠️ Exceeded unproductive time limit
                </div>
              )}
              {currentProgress.dailyProductive >= goals.dailyProductiveHours && (
                <div className="p-2 bg-green-50 border border-green-200 rounded text-green-800">
                  ✅ Daily productive goal achieved!
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
