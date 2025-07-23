import React, { useEffect, useState } from "react";
import "./Blog.css";
import bg from "../../src/assets/HeaderBg.svg";
import { Header } from "../../src/components/Header";
import { Axios } from "../../components/Helpers/Axios";
import TransformDate from "../../components/Helpers/TransformDate";
import StringSlice from "../../components/Helpers/StringSlice";
import Loading from "../../components/Loading/Loading.jsx";
const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setloading] = useState(false);


  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    setloading(true)
    Axios.get("/posts").then((data) => {
      setBlogs(data.data.data);
      console.log(data);
      setloading(false)
    });
  }, []);

  return (
    <div className="blog-page">
      {/* Header */}
      {
        loading && <Loading/>
      }
      <Header />

      {/* Hero Section */}

      {/* Main Content */}
      <section className="main-content">
        <div className="container">
          <div className="content-wrapper">
            {/* Blog Posts Grid */}
            <div className="blog-grid">
              {blogs?.map((post) => (
                <article key={post.id} className="blog-card">
                  <div className="blog-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="blog-content">
                    <h3 className="blog-title">{post.title}</h3>
                    <p
                      className="blog-excerpt"
                      dangerouslySetInnerHTML={{ __html:StringSlice(post.content)  }}
                    ></p>
                    <div className="blog-meta">
                      {post.user?.name} / {TransformDate(post.created_at)}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="sidebar">
              {/* Search */}
              <div className="sidebar-search">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.4998 2C9.14436 2.00012 7.80863 2.32436 6.60402 2.94569C5.39941 3.56702 4.36086 4.46742 3.575 5.57175C2.78914 6.67609 2.27878 7.95235 2.08647 9.29404C1.89417 10.6357 2.02551 12.004 2.46954 13.2846C2.91357 14.5652 3.65741 15.7211 4.639 16.6557C5.62059 17.5904 6.81147 18.2768 8.11228 18.6576C9.41309 19.0384 10.7861 19.1026 12.1168 18.8449C13.4475 18.5872 14.6972 18.015 15.7618 17.176L19.4138 20.828C19.6024 21.0102 19.855 21.111 20.1172 21.1087C20.3794 21.1064 20.6302 21.0012 20.8156 20.8158C21.001 20.6304 21.1062 20.3796 21.1084 20.1174C21.1107 19.8552 21.0099 19.6026 20.8278 19.414L17.1758 15.762C18.1638 14.5086 18.7789 13.0024 18.9509 11.4157C19.1228 9.82905 18.8446 8.22602 18.148 6.79009C17.4514 5.35417 16.3646 4.14336 15.0121 3.29623C13.6595 2.44911 12.0957 1.99989 10.4998 2ZM3.99977 10.5C3.99977 8.77609 4.68458 7.12279 5.90357 5.90381C7.12256 4.68482 8.77586 4 10.4998 4C12.2237 4 13.877 4.68482 15.096 5.90381C16.3149 7.12279 16.9998 8.77609 16.9998 10.5C16.9998 12.2239 16.3149 13.8772 15.096 15.0962C13.877 16.3152 12.2237 17 10.4998 17C8.77586 17 7.12256 16.3152 5.90357 15.0962C4.68458 13.8772 3.99977 12.2239 3.99977 10.5Z"
                      fill="#656565"
                    />
                  </svg>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="recent-posts">
                {blogs?.map((post) => (
                  <div key={post.id} className="recent-post">
                    <img src={post.image} alt={post.title} />
                    <div className="recent-post-content">
                      <h4>{post.title}</h4>
                      <div className="recent-post-meta">
                        {post.user?.name} / {TransformDate(post.created_at) }
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promotional Banner */}
              <div className="promo-banner">
                <div className="promo-content">
                  <h3>Step into Savings</h3>
                  <h2>Fashion Sale with Incredible Discounts!</h2>
                  <button className="promo-button">SHOP NOW</button>
                </div>
              </div>
            </aside>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="pagination-arrow"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M10.9729 12C10.9725 11.7954 11.0125 11.5928 11.0907 11.4037C11.1688 11.2147 11.2836 11.0429 11.4283 10.8983L17.0342 5.29243C17.23 5.10284 17.4926 4.99782 17.7651 5.00003C18.0377 5.00225 18.2985 5.11151 18.4912 5.30426C18.684 5.49701 18.7933 5.75779 18.7955 6.03037C18.7977 6.30295 18.6927 6.56547 18.5031 6.76133L13.3684 11.896C13.3547 11.9096 13.3439 11.9259 13.3365 11.9437C13.3291 11.9615 13.3252 11.9807 13.3252 12C13.3252 12.0193 13.3291 12.0385 13.3365 12.0563C13.3439 12.0741 13.3547 12.0904 13.3684 12.104L18.5031 17.2387C18.6927 17.4345 18.7977 17.6971 18.7955 17.9696C18.7933 18.2422 18.684 18.503 18.4912 18.6957C18.2985 18.8885 18.0377 18.9978 17.7651 19C17.4926 19.0022 17.23 18.8972 17.0342 18.7076L11.4283 13.1017C11.2836 12.9571 11.1688 12.7853 11.0907 12.5963C11.0125 12.4072 10.9725 12.2046 10.9729 12Z"
                  fill="#F15A24"
                />
                <path
                  d="M5 12C4.9996 11.7954 5.03962 11.5928 5.11776 11.4037C5.19591 11.2147 5.31064 11.0429 5.45536 10.8983L11.0613 5.29243C11.2571 5.10284 11.5196 4.99782 11.7922 5.00003C12.0648 5.00225 12.3256 5.11151 12.5183 5.30426C12.7111 5.49701 12.8203 5.75779 12.8226 6.03037C12.8248 6.30295 12.7198 6.56547 12.5302 6.76133L7.39548 11.896C7.3818 11.9096 7.37095 11.9259 7.36354 11.9437C7.35614 11.9615 7.35233 11.9807 7.35233 12C7.35233 12.0193 7.35614 12.0385 7.36354 12.0563C7.37095 12.0741 7.3818 12.0904 7.39548 12.104L12.5302 17.2387C12.7198 17.4345 12.8248 17.6971 12.8226 17.9696C12.8203 18.2422 12.7111 18.503 12.5183 18.6957C12.3256 18.8885 12.0648 18.9978 11.7922 19C11.5196 19.0022 11.2571 18.8972 11.0613 18.7076L5.45536 13.1017C5.31064 12.9571 5.19591 12.7853 5.11776 12.5963C5.03962 12.4072 4.9996 12.2046 5 12Z"
                  fill="#F15A24"
                />
              </svg>
            </button>
            <div className="pagination-numbers">
              <span
                className={`page-number ${currentPage === 1 ? "active" : ""}`}
              >
                1
              </span>
              <span
                className={`page-number ${currentPage === 2 ? "active" : ""}`}
              >
                2
              </span>
            </div>
            <button
              className="pagination-arrow"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 2))}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.8226 12C12.823 12.2046 12.783 12.4072 12.7048 12.5963C12.6267 12.7853 12.5119 12.9571 12.3672 13.1017L6.76133 18.7076C6.56547 18.8972 6.30295 19.0022 6.03037 19C5.75779 18.9978 5.49701 18.8885 5.30426 18.6957C5.11151 18.503 5.00225 18.2422 5.00003 17.9696C4.99782 17.6971 5.10284 17.4345 5.29243 17.2387L10.4271 12.104C10.4408 12.0904 10.4516 12.0741 10.459 12.0563C10.4664 12.0385 10.4703 12.0193 10.4703 12C10.4703 11.9807 10.4664 11.9615 10.459 11.9437C10.4516 11.9259 10.4408 11.9096 10.4271 11.896L5.29243 6.76133C5.10284 6.56547 4.99782 6.30295 5.00003 6.03037C5.00225 5.75779 5.11151 5.49701 5.30426 5.30426C5.49701 5.11151 5.75779 5.00225 6.03037 5.00003C6.30295 4.99782 6.56547 5.10284 6.76133 5.29243L12.3672 10.8983C12.5119 11.0429 12.6267 11.2147 12.7048 11.4037C12.783 11.5928 12.823 11.7954 12.8226 12Z"
                  fill="#F15A24"
                />
                <path
                  d="M18.7957 12C18.7961 12.2046 18.7561 12.4072 18.678 12.5963C18.5998 12.7853 18.4851 12.9571 18.3404 13.1017L12.7345 18.7076C12.5386 18.8972 12.2761 19.0022 12.0035 19C11.7309 18.9978 11.4701 18.8885 11.2774 18.6957C11.0846 18.503 10.9754 18.2422 10.9732 17.9696C10.971 17.6971 11.076 17.4345 11.2656 17.2387L16.4002 12.104C16.4139 12.0904 16.4248 12.0741 16.4322 12.0563C16.4396 12.0385 16.4434 12.0193 16.4434 12C16.4434 11.9807 16.4396 11.9615 16.4322 11.9437C16.4248 11.9259 16.4139 11.9096 16.4002 11.896L11.2656 6.76133C11.076 6.56547 10.971 6.30295 10.9732 6.03037C10.9754 5.75779 11.0846 5.49701 11.2774 5.30426C11.4701 5.11151 11.7309 5.00225 12.0035 5.00003C12.2761 4.99782 12.5386 5.10284 12.7345 5.29243L18.3404 10.8983C18.4851 11.0429 18.5998 11.2147 18.678 11.4037C18.7561 11.5928 18.7961 11.7954 18.7957 12Z"
                  fill="#F15A24"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/c8e4cdee7b0a0bc303910d6d5c276e6cab16f382?width=263"
              alt="Hub Logo"
            />
            <p className="footer-description">
              Lorem ipsum dolor sit amet consectetur. Gravida dui tellus
              pharetra quisque erat in pulvinar. Quis pharetra tincidunt mauris
              habitasse massa nec habitant.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick links</h4>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Categories</a>
              </li>
              <li>
                <a href="#">Blog & articles</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Support team</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Get in Touch</h4>
            <div className="contact-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 0C10.87 0 14 3.13 14 7C14 12.25 7 20 7 20C7 20 0 12.25 0 7C0 3.13 3.13 0 7 0ZM2 7C2 9.85 4.92 14.21 7 16.88C9.12 14.19 12 9.88 12 7C12 4.24 9.76 2 7 2C4.24 2 2 4.24 2 7ZM7 9.5C5.61929 9.5 4.5 8.38071 4.5 7C4.5 5.61929 5.61929 4.5 7 4.5C8.38071 4.5 9.5 5.61929 9.5 7C9.5 8.38071 8.38071 9.5 7 9.5Z"
                  fill="white"
                />
              </svg>
              <span>
                8819 Ohio St. South Gate,
                <br />
                CA 90280
              </span>
            </div>
            <div className="contact-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20 2C20 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2ZM18 2L10 7L2 2H18ZM18 14H2V4L10 9L18 4V14Z"
                  fill="white"
                />
              </svg>
              <span>Ourstudio@hello.com</span>
            </div>
            <div className="contact-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.54 2C3.6 2.89 3.75 3.76 3.99 4.59L2.79 5.79C2.38 4.59 2.12 3.32 2.03 2H3.54ZM13.4 14.02C14.25 14.26 15.12 14.41 16 14.47V15.96C14.68 15.87 13.41 15.61 12.2 15.21L13.4 14.02ZM4.5 0H1C0.45 0 0 0.45 0 1C0 10.39 7.61 18 17 18C17.55 18 18 17.55 18 17V13.51C18 12.96 17.55 12.51 17 12.51C15.76 12.51 14.55 12.31 13.43 11.94C13.33 11.9 13.22 11.89 13.12 11.89C12.86 11.89 12.61 11.99 12.41 12.18L10.21 14.38C7.38 12.93 5.06 10.62 3.62 7.79L5.82 5.59C6.1 5.31 6.18 4.92 6.07 4.57C5.7 3.45 5.5 2.25 5.5 1C5.5 0.45 5.05 0 4.5 0Z"
                  fill="white"
                />
              </svg>
              <span>+1 386-688-3295</span>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Join a Newsletter</h4>
            <div className="newsletter-form">
              <p>Your Email</p>
              <div className="email-input-container">
                <input type="email" placeholder="Enter Your Email" />
                <button className="subscribe-btn">Subscribe</button>
              </div>
            </div>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="19.5" stroke="white" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.86091 2.52766C10.8924 1.49621 12.2913 0.916748 13.75 0.916748H16.5C17.0063 0.916748 17.4167 1.32715 17.4167 1.83341V5.50008C17.4167 6.00634 17.0063 6.41675 16.5 6.41675H13.75V8.25008H16.5C16.7823 8.25008 17.0488 8.38013 17.2225 8.60262C17.3962 8.82511 17.4578 9.11523 17.3893 9.38907L16.4726 13.0557C16.3706 13.4638 16.004 13.7501 15.5833 13.7501H13.75V20.1667C13.75 20.673 13.3396 21.0834 12.8333 21.0834H9.16667C8.66041 21.0834 8.25 20.673 8.25 20.1667V13.7501H6.41667C5.91041 13.7501 5.5 13.3397 5.5 12.8334V9.16675C5.5 8.66049 5.91041 8.25008 6.41667 8.25008H8.25V6.41675C8.25 4.95806 8.82946 3.55911 9.86091 2.52766Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="19.5" stroke="white" />
                  <path
                    d="M9.48938 6.775L15.3176 0H13.9364L8.87588 5.8825L4.83388 0H0.171875L6.28412 8.8955L0.171875 16H1.55312L6.89738 9.78788L11.1659 16H15.8279L9.489 6.775H9.48938Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="19.5" stroke="white" />
                  <path
                    d="M17.34 5.46C17.1027 5.46 16.8707 5.53038 16.6733 5.66224C16.476 5.79409 16.3222 5.98151 16.2313 6.20078C16.1405 6.42005 16.1168 6.66133 16.1631 6.89411C16.2094 7.12689 16.3236 7.34071 16.4915 7.50853C16.6593 7.67635 16.8731 7.79064 17.1059 7.83694C17.3387 7.88324 17.5799 7.85948 17.7992 7.76866C18.0185 7.67783 18.2059 7.52402 18.3378 7.32668C18.4696 7.12935 18.54 6.89734 18.54 6.66C18.54 6.34174 18.4136 6.03652 18.1885 5.81147C17.9635 5.58643 17.6583 5.46 17.34 5.46Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>@2020 Joba Ecommerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
