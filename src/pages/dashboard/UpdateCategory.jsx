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
import Loading from "../../../components/Loading/Loading";

const UpdateCategory = () => {
  const { id } = useParams();
  const [loading , setLoading] = useState(false)
  const [imageChange, setImageChange] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: "",
    slug: "",
    image: "",
  });
  const nav = useNavigate()
  useEffect(() => {
    setLoading(true)
    Axios.get("/categories").then((data) => {
      setLoading(false)
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
  console.log(categoryData);
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    console.log("Submitting category:", categoryData);

    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("slug", categoryData.slug);
    if (imageChange) {
      formData.append("image", categoryData.image);
    }
    formData.append("_method", "PUT");

    if (!categoryData.image) {
      toast.warn("Please select image");
      return;
    }
    Axios.post(`admin/categories/${id} `, formData).then((data) =>{
setLoading(false)
toast.success('Updated Successfly')
setTimeout(() => {
  nav(-1)
}, 2000);
    }
    );
    setCategoryData({ name: "", slug: "", image: null });
    e.target.reset(); // Reset the form including file input
  };

  return (
    <div className="lg:col-span-12  space-y-6 mt-6 mx-5">
      <Notifcation />
      {loading &&<Loading/>}
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
              <Button type="submit">Update Category</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateCategory;
