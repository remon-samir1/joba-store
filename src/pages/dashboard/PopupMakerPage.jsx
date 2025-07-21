import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Copy,
  Settings,
  Zap,
  Target,
  Timer
} from "lucide-react";

const popups = [
  {
    id: "1",
    name: "Welcome Discount",
    type: "Exit Intent",
    status: "Active",
    conversion: "12.5%",
    views: 2847,
    conversions: 356,
    dateCreated: "15 Oct 2024",
  },
  {
    id: "2",
    name: "Newsletter Signup",
    type: "Time Delayed",
    status: "Active",
    conversion: "8.3%",
    views: 1923,
    conversions: 159,
    dateCreated: "12 Oct 2024",
  },
  {
    id: "3",
    name: "Free Shipping Banner",
    type: "Page Load",
    status: "Paused",
    conversion: "15.7%",
    views: 3456,
    conversions: 542,
    dateCreated: "10 Oct 2024",
  },
  {
    id: "4",
    name: "Product Recommendation",
    type: "Scroll Trigger",
    status: "Active",
    conversion: "6.9%",
    views: 1567,
    conversions: 108,
    dateCreated: "08 Oct 2024",
  },
  {
    id: "5",
    name: "Cart Abandonment",
    type: "Exit Intent",
    status: "Draft",
    conversion: "0%",
    views: 0,
    conversions: 0,
    dateCreated: "05 Oct 2024",
  },
];

const popupStats = [
  {
    title: "Total Popups",
    value: "24",
    change: "+2 this week",
    icon: Zap,
  },
  {
    title: "Active Campaigns",
    value: "18",
    change: "+3 this week",
    icon: Target,
  },
  {
    title: "Avg. Conversion Rate",
    value: "10.8%",
    change: "+1.2% vs last month",
    icon: Timer,
  },
  {
    title: "Total Conversions",
    value: "1,165",
    change: "+247 this week",
    icon: Settings,
  },
];

export default function PopupMakerPage() {
  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Popup Maker" />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {popupStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500">{stat.change}</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Create Section */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Create Popup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-20 bg-orange-500 hover:bg-orange-600 text-white flex-col">
                <Plus className="h-5 w-5 mb-1" />
                Exit Intent
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Timer className="h-5 w-5 mb-1" />
                Time Delayed
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Target className="h-5 w-5 mb-1" />
                Scroll Trigger
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Zap className="h-5 w-5 mb-1" />
                Page Load
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Popups Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Popups</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search popups..."
                    className="pl-10 w-80"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="exit-intent">Exit Intent</SelectItem>
                    <SelectItem value="time-delayed">Time Delayed</SelectItem>
                    <SelectItem value="scroll-trigger">Scroll Trigger</SelectItem>
                    <SelectItem value="page-load">Page Load</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Popup Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Conversions</TableHead>
                  <TableHead>Conversion Rate</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {popups.map((popup) => (
                  <TableRow key={popup.id}>
                    <TableCell className="font-medium">{popup.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {popup.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            popup.status === "Active"
                              ? "default"
                              : popup.status === "Paused"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            popup.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : popup.status === "Paused"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                          }
                        >
                          {popup.status}
                        </Badge>
                        {popup.status === "Active" && (
                          <Switch defaultChecked size="sm" />
                        )}
                        {popup.status === "Paused" && (
                          <Switch size="sm" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{popup.views.toLocaleString()}</TableCell>
                    <TableCell className="text-sm">{popup.conversions.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className="font-medium text-orange-600">
                        {popup.conversion}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{popup.dateCreated}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">10</span> of{" "}
                <span className="font-medium">24</span> results
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-orange-500 text-white"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
