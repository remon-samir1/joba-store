"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import Notifcation from "../Notification";
import { toast } from "react-toastify";
import { Axios } from "../Helpers/Axios";

export function OrderForm({ productId, productSizeId }) {
  const [formData, setFormData] = useState({
    shipping_name: "",
    shipping_email: "",
    shipping_address: "",
    shipping_city: "",
    shipping_state: "",
    shipping_zip: "",
    shipping_country: "EGYPT",
    quantity: "1",
    coupon_code: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = [
      "shipping_name",
      "shipping_email",
      "shipping_address",
      "shipping_city",
      "shipping_state",
      "shipping_zip",
      "shipping_country",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(
          `Please fill in: ${field.replace("shipping_", "").replace("_", " ")}`,
        );
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.shipping_email)) {
      alert("Invalid email format");
      return;
    }

    const requestBody = {
      items: [
        {
          product_id: productId, // ✅ يُمرر من الـ props
          product_size_id: productSizeId || null, // nullable
          quantity: parseInt(formData.quantity),
        },
      ],
      shipping_name: formData.shipping_name,
      shipping_email: formData.shipping_email,
      shipping_address: formData.shipping_address,
      shipping_city: formData.shipping_city,
      shipping_state: formData.shipping_state,
      shipping_zip: formData.shipping_zip,
      shipping_country: formData.shipping_country,
      coupon_code: formData.coupon_code || null, // nullable
    };

    try {
      const res = await Axios.post(
        "/orders",
        requestBody,
      );
      toast.success("Order submitted successfully!");
      console.log(res);
      // reset
      setFormData({
        shipping_name: "",
        shipping_email: "",
        shipping_address: "",
        shipping_city: "",
        shipping_state: "",
        shipping_zip: "",
        shipping_country: "EGYPT",
        quantity: "1",
        coupon_code: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting order");
    }
  };

  return (
    <div id="order-form" className="space-y-8">
      <Notifcation />
      <h2 className="text-2xl font-semibold text-gray-900">Order Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            type="text"
            value={formData.shipping_name}
            onChange={(e) => handleInputChange("shipping_name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={formData.shipping_email}
            onChange={(e) =>
              handleInputChange("shipping_email", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Address</Label>
          <Textarea
            value={formData.shipping_address}
            onChange={(e) =>
              handleInputChange("shipping_address", e.target.value)
            }
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              type="text"
              value={formData.shipping_city}
              onChange={(e) =>
                handleInputChange("shipping_city", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>State</Label>
            <Input
              type="text"
              value={formData.shipping_state}
              onChange={(e) =>
                handleInputChange("shipping_state", e.target.value)
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Zip Code</Label>
          <Input
            type="text"
            value={formData.shipping_zip}
            onChange={(e) => handleInputChange("shipping_zip", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Country</Label>
          <Select
            value={formData.shipping_country}
            onValueChange={(value) =>
              handleInputChange("shipping_country", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EGYPT">Egypt</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="CANADA">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Quantity</Label>
          <Input
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) => handleInputChange("quantity", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Coupon Code (Optional)</Label>
          <Input
            type="text"
            value={formData.coupon_code}
            onChange={(e) => handleInputChange("coupon_code", e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full bg-primary text-white">
          Submit Order
        </Button>
      </form>
    </div>
  );
}
