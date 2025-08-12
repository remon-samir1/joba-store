import React, { useEffect, useState } from "react";
import { Header } from "../../src/components/Header";
import { Axios } from "../../components/Helpers/Axios";
import { useParams } from "react-router-dom";
import TransformDate from "../../components/Helpers/TransformDate";
import SeoHelmet from "../../src/components/SeoHelmet/SeoHelmet";
import { Footer } from "../../src/components/Footer";
import { FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {t , i18n} = useTranslation()

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await Axios.get("/posts");
        const foundBlog = response.data.data.find((prev) => prev.slug === id);
        console.log(foundBlog);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError("Blog post not found");
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };
    
    getData();
  }, [id]);

  // Calculate reading time
  const calculateReadingTime = (content) => {
    if (!content) return "2 min read";
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute) + " min read";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SeoHelmet title="Loading..." description="Blog post is loading" />
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SeoHelmet title="Error" description="Something went wrong" />
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-red-700 mb-4">Error Loading Blog Post</h2>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SeoHelmet title={blog?.title} description={blog?.content?.substring(0, 160)} />
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Article Header */}
        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Featured Image */}
          <div className="relative w-full h-64 md:h-96">
            {blog?.image ? (
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-gray-400 text-xl">No featured image</div>
              </div>
            )}
          </div>
          
          {/* Article Content */}
          <div className="p-6 md:p-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {blog?.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
              <div className="flex items-center">
                <FaUser className="mr-2 text-indigo-600" />
                <span>{blog.user?.name || "Unknown Author"}</span>
              </div>
              
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-indigo-600" />
                <span>{TransformDate(blog.created_at)}</span>
              </div>
              
              <div className="flex items-center">
                <FaClock className="mr-2 text-indigo-600" />
                <span>{calculateReadingTime(blog?.content)}</span>
              </div>
            </div>
            
            {/* Content */}
            <div 
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog?.content }}
            />
            
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">TAGGED IN</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
        
        {/* Author Bio */}
        <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8 flex items-start">
            <div className="flex-shrink-0 mx-4">
              <img src={blog.user?.avatar} className={`bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 `} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {blog.user?.name || "Unknown Author"}
              </h3>
              <p className="mt-2 text-gray-600">
                {blog.user?.bio || "The author hasn't added a bio yet."}
              </p>
            </div>
          </div>
        </div>
        
        {/* Comments Section (Placeholder) */}
        <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
            <div className="text-center py-12 border border-gray-200 rounded-lg">
              <p className="text-gray-500">Comments are currently disabled</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SingleBlog;