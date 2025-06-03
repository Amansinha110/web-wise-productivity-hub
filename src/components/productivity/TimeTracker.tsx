
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Square, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TimeTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentWebsite, setCurrentWebsite] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessions, setSessions] = useState([
    { id: 1, website: "github.com", duration: "2h 30m", category: "productive", status: "completed" },
    { id: 2, website: "youtube.com", duration: "45m", category: "unproductive", status: "completed" }
  ]);
  
  const { toast } = useToast();

  const startTracking = () => {
    if (!currentWebsite.trim()) {
      toast({
        title: "Website Required",
        description: "Please enter a website to track",
        variant: "destructive"
      });
      return;
    }
    setIsTracking(true);
    toast({
      title: "Tracking Started",
      description: `Now tracking time on ${currentWebsite}`
    });
  };

  const pauseTracking = () => {
    setIsTracking(false);
    toast({
      title: "Tracking Paused",
      description: "Time tracking has been paused"
    });
  };

  const stopTracking = () => {
    if (currentWebsite && elapsedTime > 0) {
      const newSession = {
        id: sessions.length + 1,
        website: currentWebsite,
        duration: `${Math.floor(elapsedTime / 60)}m ${elapsedTime % 60}s`,
        category: "unclassified",
        status: "completed"
      };
      setSessions([newSession, ...sessions]);
    }
    setIsTracking(false);
    setCurrentWebsite("");
    setElapsedTime(0);
    toast({
      title: "Session Saved",
      description: "Time tracking session has been saved"
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Active Timer */}
      <Card>
        <CardHeader>
          <CardTitle>Active Time Tracker</CardTitle>
          <CardDescription>
            Track your time on specific websites
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="website">Website/Application</Label>
            <Input
              id="website"
              placeholder="e.g., github.com, docs.google.com"
              value={currentWebsite}
              onChange={(e) => setCurrentWebsite(e.target.value)}
              disabled={isTracking}
            />
          </div>

          <div className="text-center space-y-4">
            <div className="text-4xl font-mono font-bold text-primary">
              {Math.floor(elapsedTime / 3600).toString().padStart(2, '0')}:
              {Math.floor((elapsedTime % 3600) / 60).toString().padStart(2, '0')}:
              {(elapsedTime % 60).toString().padStart(2, '0')}
            </div>

            <div className="flex justify-center gap-2">
              {!isTracking ? (
                <Button onClick={startTracking} className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Start
                </Button>
              ) : (
                <Button onClick={pauseTracking} variant="outline" className="flex items-center gap-2">
                  <Pause className="h-4 w-4" />
                  Pause
                </Button>
              )}
              
              <Button onClick={stopTracking} variant="destructive" className="flex items-center gap-2">
                <Square className="h-4 w-4" />
                Stop
              </Button>
            </div>
          </div>

          {isTracking && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 text-center">
                🟢 Currently tracking: <strong>{currentWebsite}</strong>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>
            Your latest tracking sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{session.website}</p>
                  <p className="text-sm text-muted-foreground">{session.duration}</p>
                </div>
                <Badge 
                  variant={session.category === "productive" ? "default" : 
                          session.category === "unproductive" ? "secondary" : "outline"}
                  className={
                    session.category === "productive" ? "bg-green-100 text-green-800" :
                    session.category === "unproductive" ? "bg-orange-100 text-orange-800" : ""
                  }
                >
                  {session.category}
                </Badge>
              </div>
            ))}
            
            {sessions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No sessions recorded yet</p>
                <p className="text-sm">Start tracking to see your sessions here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
