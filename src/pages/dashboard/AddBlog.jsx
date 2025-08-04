import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Axios } from '../../../components/Helpers/Axios';
import { toast } from 'react-toastify';
import Notifcation from '../../../components/Notification';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddBlog = () => {
  const [categoryData, setCategoryData] = useState({
    name: '',
    slug: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCategoryData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleContentChange = (value) => {
    setCategoryData(prev => ({
      ...prev,
      slug: value
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!categoryData.image) {
      toast.warn("Please select image");
      setLoading(false);
      return;
    }
    
    const formData = new FormData();
    formData.append('title', categoryData.name);
    formData.append('content', categoryData.slug);
    formData.append('image', categoryData.image);

    Axios.post('admin/posts', formData).then(data => {
      setLoading(false);
      toast.success('Blog created successfully!');
      setTimeout(() => {
        nav(-1);
      }, 1500);
      setCategoryData({ name: '', slug: '', image: null });
      e.target.reset();
    }).catch(error => {
      setLoading(false);
      toast.error('Error creating Blog');
    });
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'link', 'image', 'video'
  ];

  // شاشة التحميل المحترفة
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
          <h3 className="text-xl font-bold text-gray-800 mb-2">Creating Blog</h3>
          <p className="text-gray-600 text-center mb-6">
            Please wait while we save your Blog...
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
            <span className="text-sm text-gray-600">Processing request</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="lg:col-span-12 space-y-6 mt-6 mx-5 relative">
      {loading && <ProfessionalLoader />}
      
      <Notifcation/>
      <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-primary/90  text-white">
          <CardTitle className="text-2xl">Add New Blog Post</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Post Title */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-medium">Post Title *</Label>
              <Input
                id="name"
                value={categoryData.name}
                onChange={handleChange}
                placeholder="e.g., The Future of Artificial Intelligence"
                className="mt-1 py-3 px-4 text-lg rounded-xl border-2 border-gray-2000"
                required
                disabled={loading}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <Label htmlFor="image" className="text-lg font-medium">Featured Image *</Label>
              <div className="flex items-center gap-4">
                <div className="relative flex-1 py-3 flex items-center">
                  <Input
                    id="image"
                    type="file"
                    onChange={handleImageChange}
                    className="mt-1   px-4 rounded-xl border-2 border-gray-200 file:mr-4  file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
                    accept="image/*"
                    disabled={loading}
                  />
                </div>
                {categoryData.image && (
                  <div className="bg-gray-100 rounded-lg p-2 flex items-center">
                    <span className="text-sm text-gray-700">
                      Selected: <span className="font-medium">{categoryData.image.name}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Rich Text Editor with Improved Styling */}
            <div className='space-y-2'>
              <Label htmlFor="slug" className="text-lg font-medium">Post Content *</Label>
              <div className="mt-1">
                <div className="custom-quill-container rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
                  <ReactQuill
                    theme="snow"
                    value={categoryData.slug}
                    onChange={handleContentChange}
                    placeholder="Write your amazing blog content here..."
                    modules={modules}
                    formats={formats}
                    className="h-[600px]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <Button 
                type="submit" 
                className="transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-primary to-primary/90  text-white py-6 px-10 rounded-xl text-lg font-bold shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="mr-2">Publishing</span>
                    <span className="flex">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce delay-100">.</span>
                      <span className="animate-bounce delay-200">.</span>
                    </span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Create Blog Post
                  </span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Custom Styles for Quill Editor */}
      <style jsx global>{`
        .custom-quill-container {
          width: 100%;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        
        .custom-quill-container .ql-container {
          border: none !important;
          font-size: 16px;
          min-height: 600px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        
        .custom-quill-container .ql-editor {
          min-height: 600px;
          overflow-y: auto;
          padding: 24px;
          word-wrap: break-word;
          white-space: pre-wrap;
          word-break: break-word;
          line-height: 1.7;
          color: #334155;
        }
        
        .custom-quill-container .ql-editor p {
          margin-bottom: 1.2rem;
          font-size: 17px;
        }
        
        .custom-quill-container .ql-editor h1,
        .custom-quill-container .ql-editor h2,
        .custom-quill-container .ql-editor h3 {
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
          color: #1e293b;
        }
        
        .custom-quill-container .ql-editor h1 {
          font-size: 2rem;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 0.5rem;
        }
        
        .custom-quill-container .ql-editor h2 {
          font-size: 1.75rem;
        }
        
        .custom-quill-container .ql-editor h3 {
          font-size: 1.5rem;
        }
        
        .custom-quill-container .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid #e2e8f0 !important;
          background-color: #f8fafc;
          padding: 12px 16px;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        .custom-quill-container .ql-toolbar button {
          margin-right: 8px;
          border-radius: 6px;
          transition: all 0.2s;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .custom-quill-container .ql-toolbar button:hover {
          background-color: #e2e8f0;
        }
        
        .custom-quill-container .ql-toolbar button.ql-active {
          background-color: #dbeafe;
        }
        
        .custom-quill-container .ql-toolbar .ql-picker {
          border-radius: 6px;
          height: 36px;
        }
        
        /* Ensure text wraps properly */
        .ql-editor * {
          word-wrap: break-word;
          overflow-wrap: break-word;
          white-space: pre-wrap;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
}

export default AddBlog;