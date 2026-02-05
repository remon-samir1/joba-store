import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Axios } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../../components/Notification";
import { useNavigate, useParams } from "react-router-dom";

const AddSubcategory = () => {
  const { parentId } = useParams();
  const [categoryData, setCategoryData] = useState({
    name: "",
    slug: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCategoryData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCategoryData((prev) => ({
        ...prev,
        image: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!categoryData.image) {
      toast.warn("Please select image");
      setLoading(false);
      return;
    }

    try {
      // Resolve numerical parent ID from ID if necessary
      const res = await Axios.get("/categories");
      const allCategories = res.data?.data?.data || res.data?.data || [];
      const parent = allCategories.find((c) => c.id == parentId);
      const actualParentId = parent ? parent.id : parentId;

      const formData = new FormData();
      formData.append("name", categoryData.name);
      formData.append("slug", categoryData.slug);
      formData.append("image", categoryData.image);
      formData.append("parent_id", actualParentId);

      await Axios.post("/admin/categories", formData);
      setLoading(false);
      toast.success("Subcategory created successfully!");
      setTimeout(() => {
        nav(-1);
      }, 1500);
      setCategoryData({ name: "", slug: "", image: null });
      e.target.reset();
    } catch (error) {
      setLoading(false);
      toast.error("Error creating subcategory");
    }
  };

  const ProfessionalLoader = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-95 animate-pulse-once">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full border-6 border-orange-500 border-t-transparent animate-spin-slow"></div>
            <div className="absolute inset-3 rounded-full border-6 border-orange-400 border-b-transparent animate-spin-reverse"></div>
            <div className="absolute inset-6 rounded-full border-6 border-orange-300 border-l-transparent animate-ping"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Creating Subcategory
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Please wait while we save your subcategory...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full animate-progress"></div>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-gray-600">Processing request</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="lg:col-span-12 space-y-6 mt-6 mx-5 relative">
      {loading && <ProfessionalLoader />}
      <Notifcation />
      <Card>
        <CardHeader>
          <CardTitle>Add Subcategory</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Subcategory Name *</Label>
              <Input
                id="name"
                value={categoryData.name}
                onChange={handleChange}
                placeholder="e.g., Laptops"
                className="mt-1"
                required
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="slug">Subcategory Slug *</Label>
              <Input
                id="slug"
                value={categoryData.slug}
                onChange={handleChange}
                placeholder="e.g., laptops"
                className="mt-1"
                required
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="image">Subcategory Image *</Label>
              <Input
                id="image"
                type="file"
                onChange={handleImageChange}
                className="mt-1"
                accept="image/*"
                disabled={loading}
              />
              {categoryData.image && (
                <p className="text-sm text-muted-foreground mt-1">
                  Selected: {categoryData.image.name}
                </p>
              )}
            </div>
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white transition-all duration-300 hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? "Processing..." : "Create Subcategory"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSubcategory;
