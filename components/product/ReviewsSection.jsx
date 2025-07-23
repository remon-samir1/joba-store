"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import user from '../../src/assets/user.jpg'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Axios } from "../Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../Notification";
import Loading from "../Loading/Loading";

const mockReviews = [
  {
    id: "1",
    name: "Alex Iwobi",
    date: "2 March 2021 at 06:30 pm",
    rating: 5,
    comment:
      "Thank you for the article that was made, it really provides insight and knowledge that I didn't know before.",
  },
  {
    id: "2",
    name: "Alex Iwobi",
    date: "2 March 2021 at 06:30 pm",
    rating: 5,
    comment:
      "Thank you for the article that was made, it really provides insight and knowledge that I didn't know before.",
  },
  {
    id: "3",
    name: "Alex Iwobi",
    date: "2 March 2021 at 06:30 pm",
    rating: 5,
    comment:
      "Thank you for the article that was made, it really provides insight and knowledge that I didn't know before.",
  },
];

export function ReviewsSection({ slug }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    rating: "",
    comment: "",
  });
  useEffect(() => {
    Axios.get(`/products/${slug}/reviews`).then((data) => {
      setReviews(data.data.data.data);
      console.log(data);
    });
  }, []);
  const [loading, setLoading] = useState(false);
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Axios.post(`/products/${slug}/reviews`, {
        name: newReview.name,
        email: newReview.email,
        rating: parseInt(newReview.rating),
        comment: newReview.comment,
      });
      console.log(response);
      setLoading(false);

      toast.success("Review submitted successfully!");
      setNewReview({ name: "", rating: "", comment: "" });
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Something went wrong while submitting the review.");
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`h-5 w-5 ${
          i < rating
            ? "text-primary fill-current"
            : "text-gray-300 fill-current"
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ));
  };

  return (
    <div className="space-y-8  mt-8">
      <Notifcation />
      {loading && <Loading />}
      <h2 className="text-4xl font-medium text-gray-900">Reviews (2)</h2>

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews?.map((review) => (
          <div key={review.id} className="flex gap-6">
            <img src={user} className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></img>

            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {review.name}
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(review.rating)}</div>
              </div>
              <p className="text-gray-500 text-sm">{review.date}</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      <form onSubmit={handleSubmitReview} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            placeholder="Name"
            value={newReview.name}
            onChange={(e) =>
              setNewReview((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border-primary focus:border-primary bg-background"
          />
          <Input
            placeholder="Email"
            type="email"
            required
            value={newReview.email}
            onChange={(e) =>
              setNewReview((prev) => ({ ...prev, email: e.target.value }))
            }
            className="border-primary focus:border-primary bg-background"
          />
          <Select
            value={newReview.rating}
            onValueChange={(value) =>
              setNewReview((prev) => ({ ...prev, rating: value }))
            }
          >
            <SelectTrigger className="border-primary focus:border-primary bg-background">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Textarea
          placeholder="Write comment"
          rows={4}
          value={newReview.comment}
          onChange={(e) =>
            setNewReview((prev) => ({ ...prev, comment: e.target.value }))
          }
          className="border-primary focus:border-primary bg-background resize-none"
        />

        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Share
        </Button>
      </form>
    </div>
  );
}
