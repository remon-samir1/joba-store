import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import { Header } from "../../src/components/Header";
import { Axios, baseURL } from "../../components/Helpers/Axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Notifcation from "../../components/Notification";
const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    Axios.get("/wishlist").then((data) => {
      setWishlist(data.data.data.products);
      setLoading(false);
      console.log(data);
    });
  }, []);
  const handleRemoveToWishlist = async (e, slug) => {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Axios.delete(`/wishlist/${slug}`);
      console.log("API response:", response.data);
      setWishlist(wishlist.filter((data) => data.slug !== slug));
      toast.success(`Removed from wishlist !`);
      setLoading(true);

    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist. Please try again.");
      setLoading(true);

    } finally {
    }
  };

  return (
    <div className="wishlist-page">
  
      <Notifcation />
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="wishlist-main">
        <div className="container">
          <h1 className="page-title">Wishlist</h1>

          {wishlist.length > 0 ? (
            <>
              <div className="wishlist-grid">
                {wishlist?.map((item) => (
                  <Link
                    to={`/products/${item.id}`}
                    key={item.id}
                    className="wishlist-card"
                  >
                    <div className="card-image-container">
                      <img
                        src={item.image || `${baseURL}/${item.image}`}
                        alt={item.name.en}
                        className="card-image"
                      />
                      <div className="card-overlay">
                        <div className="card-content">
                          <h3 className="product-title">{item.name.en}</h3>
                          {/* <p className="product-category">{item.category.name}</p> */}
                          <div className="product-pricing">
                            <span className="current-price">
                              EGP{item.discount_price}
                            </span>
                            {item.price && (
                              <span className="original-price">
                                EGP {item.price}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          className="add-to-cart-btn"
                          onClick={(e) => handleRemoveToWishlist(e, item.slug)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M11.3333 10.6667H5.592L5.814 10H12.5027L14.2173 4H4.42933L3.82933 2H2V3.33333H2.83733L4.634 9.32333L4.162 10.7393C3.80107 10.8343 3.47398 11.0285 3.21784 11.2999C2.96169 11.5714 2.78675 11.9092 2.71286 12.275C2.63897 12.6408 2.66909 13.02 2.7998 13.3696C2.93051 13.7192 3.15657 14.0251 3.45235 14.2527C3.74813 14.4803 4.10177 14.6204 4.47317 14.6572C4.84456 14.694 5.21883 14.626 5.55351 14.4609C5.8882 14.2957 6.1699 14.0401 6.36665 13.7229C6.56341 13.4058 6.66735 13.0399 6.66667 12.6667C6.66446 12.439 6.62296 12.2135 6.544 12H9.456C9.37704 12.2135 9.33554 12.439 9.33333 12.6667C9.33333 13.0622 9.45063 13.4489 9.67039 13.7778C9.89016 14.1067 10.2025 14.3631 10.568 14.5144C10.9334 14.6658 11.3356 14.7054 11.7235 14.6282C12.1115 14.5511 12.4678 14.3606 12.7475 14.0809C13.0273 13.8012 13.2177 13.4448 13.2949 13.0568C13.3721 12.6689 13.3325 12.2668 13.1811 11.9013C13.0297 11.5358 12.7734 11.2235 12.4445 11.0037C12.1156 10.784 11.7289 10.6667 11.3333 10.6667Z"
                              fill="white"
                            />
                          </svg>
                          <span>Remove From Washlist</span>
                        </button>
                      </div>
                      {item.is_out_of_stock && (
                        <div className="sale-badge">SALE</div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="continue-shopping-container">
                <Link to="/categories" className="continue-shopping-btn">
                  Continue shopping
                </Link>
              </div>
            </>
          ) : (
            <div className="empty-wishlist">
              <p>Your wishlist is empty</p>
              <Link to="/categories" className="continue-shopping-btn">
                Continue shopping
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/5ee4120163e3a103fb95e3b681a8c805e2f28224?width=263"
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

export default WishlistPage;
