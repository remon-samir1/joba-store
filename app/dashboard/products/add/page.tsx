"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Upload, Plus, Calendar } from "lucide-react";

export default function AddProductPage() {
  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Add Products" />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search product for add"
              className="pl-10 w-80"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Details */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    placeholder="Seasonal Allergies"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="product-description">
                    Product Description
                  </Label>
                  <Textarea
                    id="product-description"
                    placeholder="Lorem ipsum dolor sit amet consectetur. Lectus amet massa viverra molestudis. Nullam sagittis morbi ac sagittis mattis, In mauris tellus ut molestie lectus mauris, hendrerit ex massa hac in. Amet nec id ultrices aliquam viverra lacus."
                    className="mt-1 min-h-32"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="product-price">Product Price</Label>
                  <Input
                    id="product-price"
                    placeholder="EGP 999.89"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discounted-price">
                      Discounted Price (Optional)
                    </Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">EGP</span>
                      <Input
                        id="discounted-price"
                        placeholder="999.89"
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-500">Sales</span>
                      <Input placeholder="EGP 900.89" className="flex-1" />
                    </div>
                  </div>

                  <div>
                    <Label>Tax Included</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Checkbox id="tax-yes" />
                      <Label htmlFor="tax-yes">Yes</Label>
                      <Checkbox id="tax-no" />
                      <Label htmlFor="tax-no">No</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Expiration</Label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div className="relative">
                      <Input placeholder="Start" />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <Input placeholder="End" />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Variation weight and pricing */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Variation weight</Label>
                      <div className="space-y-2 mt-2">
                        <Input placeholder="10kg" />
                        <Input placeholder="1 liter" />
                        <Input placeholder="1 box" />
                      </div>
                    </div>
                    <div>
                      <Label>Variation Pricing</Label>
                      <div className="space-y-2 mt-2">
                        <Input placeholder="EGP 350" />
                        <Input placeholder="EGP 300" />
                        <Input placeholder="EGP 300" />
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-orange-500 text-white hover:bg-orange-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add new
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Add Attachment */}
            <Card>
              <CardHeader>
                <CardTitle>Add attachment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <span className="text-gray-500">File: PDF</span>
                  <Button
                    variant="outline"
                    className="ml-4 bg-orange-500 text-white hover:bg-orange-600"
                  >
                    Choose file
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stock-quantity">Stock Quantity</Label>
                    <Input
                      id="stock-quantity"
                      placeholder="100"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock-status">Stock Status</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="In Stock" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="out-of-stock">
                          Out of Stock
                        </SelectItem>
                        <SelectItem value="low-stock">Low Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="unlimited" />
                  <Label htmlFor="unlimited">Unlimited</Label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="best-seller" />
                    <Label htmlFor="best-seller">
                      Highlight this product in a best seller section.
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="new-arrivals" />
                    <Label htmlFor="new-arrivals">
                      Highlight this product in a new arrivals section.
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1 bg-gray-500 text-white hover:bg-gray-600"
              >
                Save to draft
              </Button>
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                Update Product
              </Button>
            </div>
          </div>

          {/* Right Column - Product Image and Categories */}
          <div className="space-y-6">
            {/* Upload Product Image */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Product Image</CardTitle>
                <p className="text-sm text-gray-500">Product Image</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Main Image */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-gray-500">Product Image</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Browse
                    </Button>
                    <Button variant="outline" size="sm">
                      Replace
                    </Button>
                  </div>
                </div>

                {/* Additional Images */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="w-full h-20 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">+</span>
                  </div>
                  <div className="w-full h-20 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">+</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full text-orange-500 border-orange-500 hover:bg-orange-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="product-categories">Product Categories</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical-mixtures">
                        Medical Mixtures
                      </SelectItem>
                      <SelectItem value="therapeutic-oils">
                        Therapeutic Oils
                      </SelectItem>
                      <SelectItem value="creams-ointments">
                        Creams & Ointments
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="product-tag">Product Tag</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bestseller">Bestseller</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="featured">Featured</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
