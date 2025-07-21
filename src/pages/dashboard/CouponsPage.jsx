import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Ticket } from "lucide-react";

export default function CouponsPage() {
  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Coupon Code" />
      
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Coupon Management</h2>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Coupon
          </Button>
        </div>

        <Card className="text-center py-16">
          <CardContent>
            <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <CardTitle className="text-xl text-gray-600 mb-2">
              Coupon Management
            </CardTitle>
            <p className="text-gray-500">
              Create and manage discount coupons for your store. This feature is coming soon!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
