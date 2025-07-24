import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Axios } from '../../../components/Helpers/Axios';
import { toast } from 'react-toastify';
import Notifcation from '../../../components/Notification';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState({
    name: '',
    slug: '',
    image: ''
  });
  const [loading , setLoading] = useState(false)
const nav =useNavigate()
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCategoryData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCategoryData(prev => ({
        ...prev,
        image: e.target.files[0]
      }));
    }
  };
console.log(categoryData);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    console.log('Submitting category:', categoryData);
    
    const formData = new FormData();
    formData.append('name', categoryData.name);
    formData.append('slug', categoryData.slug);
    formData.append('image', categoryData.image);

    if (!categoryData.image) {
      toast.warn("Please select image");
      return;
    }
    Axios.post('admin/categories' , formData).then(data => {
setLoading(false)
toast.success('Created Successfly')
setTimeout(() => {
  nav(-1)
}, 2000);
      setCategoryData({ name: '', slug: '', image: null });
      e.target.reset(); // Reset the form including file input
    })
  };

  return (
    <div className="lg:col-span-12  space-y-6 mt-6 mx-5">
      {
        loading && <Loading/>
      }
      <Notifcation/>
      <Card>
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
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
                  Selected: {categoryData.image.name}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button type="submit">Create Category</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddCategory;