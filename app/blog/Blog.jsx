import React, { useEffect, useState, useMemo } from "react";
import "./Blog.css";
import bg from "../../src/assets/HeaderBg.svg";
import { Header } from "../../src/components/Header";
import { Axios } from "../../components/Helpers/Axios";
import TransformDate from "../../components/Helpers/TransformDate";
import StringSlice from "../../components/Helpers/StringSlice";
import Loading from "../../components/Loading/Loading.jsx";
import SeoHelmet from "../../src/components/SeoHelmet/SeoHelmet";
import { Footer } from "../../src/components/Footer";
import { Link } from "react-router-dom";
// import Footer from "./Footer"; 

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  // Fetch blog data
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await Axios.get("/posts");
        setBlogs(data.data);
      } catch (err) {
        console.error("Blog fetch error:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filtered blogs based on search term
  const filteredBlogs = useMemo(() => {
    if (!searchTerm) return blogs;
    const term = searchTerm.toLowerCase();
    return blogs.filter(
      post =>
        post.title.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term)
    );
  }, [blogs, searchTerm]);

  // Recent posts (first 3)
  const recentPosts = useMemo(() => blogs.slice(0, 3), [blogs]);

  // Strip HTML tags for safe excerpt display
  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  if (loading) return <Loading fullscreen={true} />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="blog-page">
      <SeoHelmet 
        title="Juba Academy Blog"
        description="Explore our latest articles and insights"
      />
      
      <Header />

      <section className="main-content">
        <div className="container">
          <div className="content-wrapper">
            {/* Blog Posts Grid */}
            <div className="blog-grid">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map(post => (
                  <Link to={`/blog/${post.slug}`} key={post.id} className="blog-card">
                    <div className="blog-image">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        loading="lazy"
                      />
                    </div>
                    <div className="blog-content">
                      <h3 className="blog-title">{post.title}</h3>
                      <p className="blog-excerpt">
                        {StringSlice(stripHtml(post.content), 150)}
                      </p>
                      <div className="blog-meta">
                        {post.user?.name} / {TransformDate(post.created_at)}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="no-results">
                  <h3>No posts found</h3>
                  <p>Try adjusting your search terms</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="sidebar">
              {/* Search */}
              <div className="sidebar-search">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    aria-label="Search blog posts"
                  />
                  <SearchIcon />
                </div>
              </div>

              {/* Recent Posts */}
              <div className="recent-posts">
                <h3 className="sidebar-title">Recent Articles</h3>
                {recentPosts.map(post => (
                  <Link to={`/blog/${post.slug}`} key={`recent-${post.id}`} className="recent-post">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      loading="lazy"
                    />
                    <div className="recent-post-content">
                      <h4>{post.title}</h4>
                      <div className="recent-post-meta">
                        {TransformDate(post.created_at)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Promotional Banner */}
              <div className="promo-banner">
                <div className="promo-content">
                  <h3>Step into Savings</h3>
                  <h2>Fashion Sale with Incredible Discounts!</h2>
                  <Link to='/categories' className="promo-button">SHOP NOW</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Extracted SVG components
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.4998 2C9.14436 2.00012 7.80863 2.32436 6.60402 2.94569C5.39941 3.56702 4.36086 4.46742 3.575 5.57175C2.78914 6.67609 2.27878 7.95235 2.08647 9.29404C1.89417 10.6357 2.02551 12.004 2.46954 13.2846C2.91357 14.5652 3.65741 15.7211 4.639 16.6557C5.62059 17.5904 6.81147 18.2768 8.11228 18.6576C9.41309 19.0384 10.7861 19.1026 12.1168 18.8449C13.4475 18.5872 14.6972 18.015 15.7618 17.176L19.4138 20.828C19.6024 21.0102 19.855 21.111 20.1172 21.1087C20.3794 21.1064 20.6302 21.0012 20.8156 20.8158C21.001 20.6304 21.1062 20.3796 21.1084 20.1174C21.1107 19.8552 21.0099 19.6026 20.8278 19.414L17.1758 15.762C18.1638 14.5086 18.7789 13.0024 18.9509 11.4157C19.1228 9.82905 18.8446 8.22602 18.148 6.79009C17.4514 5.35417 16.3646 4.14336 15.0121 3.29623C13.6595 2.44911 12.0957 1.99989 10.4998 2ZM3.99977 10.5C3.99977 8.77609 4.68458 7.12279 5.90357 5.90381C7.12256 4.68482 8.77586 4 10.4998 4C12.2237 4 13.877 4.68482 15.096 5.90381C16.3149 7.12279 16.9998 8.77609 16.9998 10.5C16.9998 12.2239 16.3149 13.8772 15.096 15.0962C13.877 16.3152 12.2237 17 10.4998 17C8.77586 17 7.12256 16.3152 5.90357 15.0962C4.68458 13.8772 3.99977 12.2239 3.99977 10.5Z"
      fill="#656565"
    />
  </svg>
);

export default BlogPage;