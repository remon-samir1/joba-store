import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { 
  Search, 
  Filter, 
  Star, 
  Eye, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  Flag,
  Trash2
} from "lucide-react";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";

const reviews = [
  {
    id: "1",
    customer: "John Doe",
    email: "john@example.com",
    product: "Joint Pain Relief",
    rating: 5,
    title: "Excellent product, highly recommended!",
    review: "This product has completely changed my life. The pain relief is amazing and it works within minutes.",
    date: "15 Oct 2024",
    status: "Published",
    helpful: 12,
    reported: 0,
  },
  {
    id: "2",
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "Neck & Back Care",
    rating: 4,
    title: "Good quality, fast shipping",
    review: "Product works well for my back pain. Delivery was quick and packaging was secure.",
    date: "14 Oct 2024",
    status: "Published",
    helpful: 8,
    reported: 0,
  },
  {
    id: "3",
    customer: "Mike Johnson",
    email: "mike@example.com",
    product: "Cough Relief",
    rating: 2,
    title: "Not as effective as expected",
    review: "The product didn't work as well as I hoped. Had to use multiple doses for minimal relief.",
    date: "13 Oct 2024",
    status: "Pending",
    helpful: 3,
    reported: 1,
  },
  {
    id: "4",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    product: "Nasal Soothing",
    rating: 5,
    title: "Amazing results!",
    review: "Works immediately and provides long-lasting relief. Will definitely buy again.",
    date: "12 Oct 2024",
    status: "Published",
    helpful: 15,
    reported: 0,
  },
  {
    id: "5",
    customer: "David Brown",
    email: "david@example.com",
    product: "Therapeutic Oil",
    rating: 1,
    title: "Poor quality product",
    review: "Product leaked during shipping and the smell was unpleasant. Very disappointed.",
    date: "11 Oct 2024",
    status: "Hidden",
    helpful: 2,
    reported: 3,
  },
];

const reviewStats = [
  {
    title: "Total Reviews",
    value: "2,847",
    change: "+124 this week",
    rating: "4.2",
  },
  {
    title: "Pending Reviews",
    value: "23",
    change: "+8 new today",
    rating: "3.8",
  },
  {
    title: "Average Rating",
    value: "4.2",
    change: "+0.1 this month",
    rating: "4.2",
  },
  {
    title: "Reported Reviews",
    value: "7",
    change: "-2 resolved",
    rating: "2.1",
  },
];

const StarRating = ({ rating, size = "sm" }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size === "sm" ? "h-4 w-4" : "h-5 w-5"} ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">({rating})</span>
    </div>
  );
};

export default function ReviewsPage() {
  useEffect(()=>{
    Axios.get('/admin/reviews').then(data =>console.log(data))
  },[])
  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Product Reviews" />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {reviewStats.map((stat, index) => (
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
                  <div className="text-right">
                    <StarRating rating={parseFloat(stat.rating)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reviews Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Reviews</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search reviews..."
                    className="pl-10 w-80"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{review.customer}</div>
                        <div className="text-sm text-gray-500">
                          {review.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{review.product}</TableCell>
                    <TableCell>
                      <StarRating rating={review.rating} />
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium text-sm mb-1">
                          {review.title}
                        </div>
                        <div className="text-sm text-gray-600 truncate">
                          {review.review}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{review.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          review.status === "Published"
                            ? "default"
                            : review.status === "Pending"
                              ? "secondary"
                              : "destructive"
                        }
                        className={
                          review.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : review.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }
                      >
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-3 w-3 text-green-600" />
                          <span>{review.helpful}</span>
                        </div>
                        {review.reported > 0 && (
                          <div className="flex items-center space-x-1">
                            <Flag className="h-3 w-3 text-red-600" />
                            <span className="text-red-600">{review.reported}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        {review.status === "Pending" && (
                          <>
                            <Button variant="ghost" size="sm" className="text-green-600">
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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
                <span className="font-medium">2,847</span> results
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
