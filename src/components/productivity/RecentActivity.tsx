
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";

const recentActivities = [
  {
    id: 1,
    website: "github.com",
    duration: "2h 30m",
    category: "productive",
    time: "2 hours ago"
  },
  {
    id: 2,
    website: "stackoverflow.com",
    duration: "45m",
    category: "productive", 
    time: "3 hours ago"
  },
  {
    id: 3,
    website: "youtube.com",
    duration: "1h 15m",
    category: "unproductive",
    time: "4 hours ago"
  },
  {
    id: 4,
    website: "docs.google.com",
    duration: "1h 20m",
    category: "productive",
    time: "5 hours ago"
  },
  {
    id: 5,
    website: "twitter.com",
    duration: "35m",
    category: "unproductive",
    time: "6 hours ago"
  }
];

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Your latest website visits and time spent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{activity.website}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium">{activity.duration}</p>
                  <Badge 
                    variant={activity.category === "productive" ? "default" : "secondary"}
                    className={activity.category === "productive" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                  >
                    {activity.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
