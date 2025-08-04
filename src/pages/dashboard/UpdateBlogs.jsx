import React, { useEffect, useState, useMemo } from "react";
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
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const UpdateBlogs = () => {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    setLoading(true);
    Axios.get("posts")
      .then((data) => {
        const post = data.data.data.find((item) => item.slug === id);
        setCategoryData({
          title: post.title,
          content: post.content,
          image: post.image,
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Failed to load blog data.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCategoryData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleContentChange = (value) => {
    setCategoryData((prev) => ({
      ...prev,
      content: value,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!categoryData.image) {
      toast.warn("Please select image");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", categoryData.title);
    formData.append("content", categoryData.content);
    if(typeof categoryData.image !== 'string'){
      
      formData.append("image", categoryData.image);
    }
    formData.append("_method", "PUT");

    Axios.post(`admin/posts/${id}`, formData)
      .then(() => {
        toast.success("Blog Updated successfully!");
        setTimeout(() => nav(-1), 1500);
      })
      .catch((error) => {
        toast.error("Error updating blog");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  }), []);

  const formats = [
    'header', 'bold', 'italic', 'underline',
    'list', 'bullet', 'link', 'image'
  ];

  const ProfessionalLoader = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-95 animate-pulse-once">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full border-6 border-blue-500 border-t-transparent animate-spin-slow"></div>
            <div className="absolute inset-3 rounded-full border-6 border-green-400 border-b-transparent animate-spin-reverse"></div>
            <div className="absolute inset-6 rounded-full border-6 border-purple-500 border-l-transparent animate-ping"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Loading...</h3>
          <p className="text-gray-600 text-center mb-6">Please wait while we update your Blog...</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-progress"></div>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
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
      <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-white">
          <CardTitle className="text-2xl">Update Blog Post</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-lg font-medium">Post Title *</Label>
              <Input
                id="title"
                value={categoryData.title}
                onChange={handleChange}
                placeholder="Enter post title"
                className="mt-1 py-3 px-4 text-lg rounded-xl border-2 border-gray-2000"
                disabled={loading}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <Label htmlFor="image" className="text-lg font-medium">Featured Image *</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                  className="mt-1 px-4 rounded-xl border-2 border-gray-200 file:mr-4 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
                  accept="image/*"
                  disabled={loading}
                />
                {categoryData.image && (
                  <span className="text-sm text-gray-700">
                    Selected: <span className="font-medium">
                      {categoryData.image.name || StringSlice(categoryData.image, 20)}
                    </span>
                  </span>
                )}
              </div>
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-lg font-medium">Post Content *</Label>
              <div className="custom-quill-container rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
                <ReactQuill
                  theme="snow"
                  value={categoryData.content}
                  onChange={handleContentChange}
                  placeholder="Write your content here..."
                  modules={modules}
                  formats={formats}
                  className="h-[600px]"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                className="transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-primary to-primary/90 text-white py-6 px-10 rounded-xl text-lg font-bold shadow-lg"
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
                ) : (
                  "Update Blog Post"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Global Custom Styling for ReactQuill */}
      <style jsx="true" global>{`
        .custom-quill-container .ql-container {
          font-size: 16px;
          min-height: 600px;
          font-family: 'Inter', sans-serif;
        }

        .custom-quill-container .ql-editor {
          min-height: 600px;
          padding: 24px;
          line-height: 1.7;
          color: #334155;
        }

        .custom-quill-container .ql-toolbar {
          background-color: #f8fafc;
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
        }

        .custom-quill-container .ql-editor p {
          margin-bottom: 1.2rem;
          font-size: 17px;
        }

        .custom-quill-container .ql-editor h1 {
          font-size: 2rem;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default UpdateBlogs;
