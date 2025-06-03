
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from "@/components/productivity/DashboardOverview";
import { TimeTracker } from "@/components/productivity/TimeTracker";
import { WebsiteCategories } from "@/components/productivity/WebsiteCategories";
import { WeeklyReports } from "@/components/productivity/WeeklyReports";
import { GoalSettings } from "@/components/productivity/GoalSettings";
import { Clock, Target, BarChart3, Settings, Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Productivity Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Track your time, analyze your habits, and boost your productivity
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5 mx-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="tracker" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time Tracker
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Goals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="tracker">
            <TimeTracker />
          </TabsContent>

          <TabsContent value="categories">
            <WebsiteCategories />
          </TabsContent>

          <TabsContent value="reports">
            <WeeklyReports />
          </TabsContent>

          <TabsContent value="goals">
            <GoalSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
