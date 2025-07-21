import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Bell,
  Shield,
  CreditCard,
  Package,
  Heart,
  Settings,
  Edit3
} from "lucide-react";

const userStats = [
  {
    title: "Total Orders",
    value: "24",
    description: "Orders placed",
    icon: Package,
  },
  {
    title: "Wishlist Items",
    value: "12",
    description: "Saved products",
    icon: Heart,
  },
  {
    title: "Account Status",
    value: "Verified",
    description: "Email verified",
    icon: Shield,
  },
  {
    title: "Loyalty Points",
    value: "1,247",
    description: "Reward points",
    icon: CreditCard,
  },
];

const recentOrders = [
  {
    id: "#ORD-001",
    product: "Joint Pain Relief",
    date: "15 Oct 2024",
    status: "Delivered",
    amount: "EGP 84.00",
  },
  {
    id: "#ORD-002",
    product: "Neck & Back Care",
    date: "12 Oct 2024",
    status: "Shipped",
    amount: "EGP 120.00",
  },
  {
    id: "#ORD-003",
    product: "Cough Relief",
    date: "08 Oct 2024",
    status: "Processing",
    amount: "EGP 95.00",
  },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-12 w-12 text-orange-600" />
                    </div>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full bg-orange-500 hover:bg-orange-600 text-white p-2"
                    >
                      <Camera className="h-3 w-3" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                  <p className="text-gray-600">john@example.com</p>
                  <Badge className="mt-2 bg-green-100 text-green-700">
                    Premium Member
                  </Badge>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">john@example.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">+20 123 456 7890</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Cairo, Egypt</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {userStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-4 text-center">
                      <Icon className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                      <p className="text-lg font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-600">{stat.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value="+20 123 456 7890" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value="Health enthusiast and regular customer since 2023."
                    />
                  </div>
                </div>
                <Button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Address Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" value="123 Tahrir Square" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value="Cairo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" value="Egypt" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal">Postal Code</Label>
                    <Input id="postal" value="11511" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" value="Cairo Governorate" />
                  </div>
                </div>
                <Button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white">
                  Update Address
                </Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">
                        Receive order updates and promotions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-600">
                        Get shipping updates via SMS
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Updates</p>
                      <p className="text-sm text-gray-600">
                        Receive product recommendations and deals
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Security Alerts</p>
                      <p className="text-sm text-gray-600">
                        Get notified about account security
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Recent Orders</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{order.product}</p>
                        <p className="text-sm text-gray-600">
                          {order.id} • {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Shipped"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {order.status}
                        </Badge>
                        <p className="text-sm font-medium text-orange-600 mt-1">
                          {order.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
