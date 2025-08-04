import React, { useEffect, useState } from "react";
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
import StringSlice from "../../../components/Helpers/StringSlice";

const UpdateCategory = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [imageChange, setImageChange] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: "",
    slug: "",
    image: "",
  });
  const nav = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    Axios.get("/categories").then((data) => {
      setLoading(false);
      setCategoryData(data.data.data.data.filter((prev) => prev.slug == id)[0]);
    });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCategoryData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageChange(true);
    if (e.target.files && e.target.files[0]) {
      setCategoryData((prev) => ({
        ...prev,
        image: e.target.files[0],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!categoryData.image) {
      toast.warn("Please select image");
      setLoading(false);
      return;
    }
    
    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("slug", categoryData.slug);
    if (imageChange) {
      formData.append("image", categoryData.image);
    }
    formData.append("_method", "PUT");

    Axios.post(`admin/categories/${id}`, formData)
      .then((data) => {
        setLoading(false);
        toast.success('Category updated successfully!');
        setTimeout(() => {
          nav(-1);
        }, 1500);
        setCategoryData({ name: "", slug: "", image: null });
        e.target.reset();
      })
      .catch(error => {
        setLoading(false);
        toast.error('Error updating category');
      });
  };

  const ProfessionalLoader = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-95 animate-pulse-once">
        <div className="flex flex-col items-center">
          
          {/* Spinner Animation */}
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full border-6 border-blue-500 border-t-transparent animate-spin-slow"></div>
            <div className="absolute inset-3 rounded-full border-6 border-green-400 border-b-transparent animate-spin-reverse"></div>
            <div className="absolute inset-6 rounded-full border-6 border-purple-500 border-l-transparent animate-ping"></div>
          </div>
          
          {/* Text Content */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">Updating Category</h3>
          <p className="text-gray-600 text-center mb-6">
            Saving your changes...
          </p>
          
          {/* Animated Progress */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-progress"
            ></div>
          </div>
          
          {/* Status Indicator */}
          <div className="flex items-center mt-2">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-gray-600">Applying changes</span>
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
          <CardTitle>Update Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category Name */}
            <div>
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                value={categoryData.name}
                onChange={handleChange}
                placeholder="e.g., Electronics"
                className="mt-1"
                required
                disabled={loading}
              />
            </div>

            {/* Category Slug */}
            <div>
              <Label htmlFor="slug">Category Slug *</Label>
              <Input
                id="slug"
                value={categoryData.slug}
                onChange={handleChange}
                placeholder="e.g., electronics"
                className="mt-1"
                required
                disabled={loading}
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="image">Category Image</Label>
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
                  Selected:{" "}
                  {categoryData.image.name ||
                    StringSlice(categoryData.image, 20)}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button 
                type="submit"
                className="transition-all duration-300 hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="mr-2">Updating</span>
                    <span className="flex">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce delay-100">.</span>
                      <span className="animate-bounce delay-200">.</span>
                    </span>
                  </span>
                ) : 'Update Category'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateCategory;