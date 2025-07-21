"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Star,
  MoreHorizontal,
  Filter,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const reviews = [
  {
    id: "1",
    productName: "Neck & Back Pain Relief",
    customerName: "Ahmed Hassan",
    rating: 5,
    comment:
      "Excellent product! Really helped with my back pain. Highly recommended.",
    date: "2024-01-15",
    status: "approved",
    helpful: 12,
  },
  {
    id: "2",
    productName: "Joint Pain Formula",
    customerName: "Sara Mohamed",
    rating: 4,
    comment:
      "Good quality, but took a while to see results. Overall satisfied.",
    date: "2024-01-14",
    status: "pending",
    helpful: 8,
  },
  {
    id: "3",
    productName: "Therapeutic Oil",
    customerName: "Omar Ali",
    rating: 3,
    comment:
      "Average product. The scent is too strong for my liking, but it works.",
    date: "2024-01-13",
    status: "approved",
    helpful: 5,
  },
  {
    id: "4",
    productName: "Pain Relief Cream",
    customerName: "Fatma Khalil",
    rating: 2,
    comment:
      "Not effective for me. Didn't notice any improvement after using it.",
    date: "2024-01-12",
    status: "rejected",
    helpful: 2,
  },
  {
    id: "5",
    productName: "Natural Healing Balm",
    customerName: "Mohamed Adel",
    rating: 5,
    comment:
      "Amazing product! Fast shipping and excellent customer service too.",
    date: "2024-01-11",
    status: "approved",
    helpful: 18,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-2">({rating}/5)</span>
    </div>
  );
};

const getStatusBadge = (status: string) => {
  const statusConfig = {
    approved: {
      bg: "bg-green-100",
      text: "text-green-700",
      label: "Approved",
    },
    pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
    rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  return (
    <Badge className={`${config.bg} ${config.text} hover:${config.bg}`}>
      {config.label}
    </Badge>
  );
};

export default function ReviewsPage() {
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Product Reviews" />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Product Reviews</h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Reviews
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviews.length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Star className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Average Rating
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {averageRating.toFixed(1)}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {reviews.filter((r) => r.status === "pending").length}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {reviews.filter((r) => r.status === "approved").length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search reviews..."
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  All Status
                </Button>
                <Button variant="outline" size="sm">
                  All Ratings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Helpful</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">
                      {review.productName}
                    </TableCell>
                    <TableCell>{review.customerName}</TableCell>
                    <TableCell>
                      <StarRating rating={review.rating} />
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={review.comment}>
                        {review.comment}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {review.date}
                    </TableCell>
                    <TableCell>{getStatusBadge(review.status)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{review.helpful} helpful</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {review.status === "pending" && (
                            <>
                              <DropdownMenuItem className="text-green-600">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
