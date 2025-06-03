
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const WebsiteCategories = () => {
  const [websites, setWebsites] = useState([
    { id: 1, url: "github.com", category: "productive", description: "Code repository" },
    { id: 2, url: "stackoverflow.com", category: "productive", description: "Programming Q&A" },
    { id: 3, url: "youtube.com", category: "unproductive", description: "Video platform" },
    { id: 4, url: "facebook.com", category: "unproductive", description: "Social media" },
    { id: 5, url: "docs.google.com", category: "productive", description: "Document editing" },
    { id: 6, url: "netflix.com", category: "unproductive", description: "Streaming service" }
  ]);

  const [newWebsite, setNewWebsite] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  
  const { toast } = useToast();

  const addWebsite = () => {
    if (!newWebsite.trim() || !newCategory) {
      toast({
        title: "Missing Information",
        description: "Please fill in website URL and category",
        variant: "destructive"
      });
      return;
    }

    const website = {
      id: websites.length + 1,
      url: newWebsite.trim(),
      category: newCategory,
      description: newDescription.trim() || "No description"
    };

    setWebsites([...websites, website]);
    setNewWebsite("");
    setNewCategory("");
    setNewDescription("");
    
    toast({
      title: "Website Added",
      description: `${website.url} has been categorized as ${website.category}`
    });
  };

  const removeWebsite = (id: number) => {
    setWebsites(websites.filter(w => w.id !== id));
    toast({
      title: "Website Removed",
      description: "Website has been removed from categories"
    });
  };

  const updateCategory = (id: number, newCategory: string) => {
    setWebsites(websites.map(w => 
      w.id === id ? { ...w, category: newCategory } : w
    ));
    toast({
      title: "Category Updated",
      description: "Website category has been updated"
    });
  };

  const productiveCount = websites.filter(w => w.category === "productive").length;
  const unproductiveCount = websites.filter(w => w.category === "unproductive").length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Add New Website */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Add Website</CardTitle>
          <CardDescription>
            Categorize a new website as productive or unproductive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <Input
              id="url"
              placeholder="e.g., github.com"
              value={newWebsite}
              onChange={(e) => setNewWebsite(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="productive">Productive</SelectItem>
                <SelectItem value="unproductive">Unproductive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Brief description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <Button onClick={addWebsite} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Website
          </Button>
        </CardContent>
      </Card>

      {/* Website List */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Website Categories</CardTitle>
          <CardDescription>
            Manage your website classifications
          </CardDescription>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">Productive: {productiveCount}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-100 text-orange-800">Unproductive: {unproductiveCount}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {websites.map((website) => (
              <div key={website.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{website.url}</h4>
                    <Badge 
                      variant={website.category === "productive" ? "default" : "secondary"}
                      className={website.category === "productive" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                    >
                      {website.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{website.description}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Select 
                    value={website.category} 
                    onValueChange={(value) => updateCategory(website.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="productive">Productive</SelectItem>
                      <SelectItem value="unproductive">Unproductive</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeWebsite(website.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {websites.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No websites categorized yet</p>
                <p className="text-sm">Add websites to start categorizing your browsing habits</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
