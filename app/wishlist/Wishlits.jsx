import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import { Header } from "../../src/components/Header";
import { Axios, baseURL } from "../../components/Helpers/Axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Notifcation from "../../components/Notification";
import { Footer } from "../../src/components/Footer";
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
      {loading && (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading your Wishlist...</p>
        </div>
      )}
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
                    to={`/products/${item.slug}`}
                    key={item.id}
                    className="wishlist-card"
                  >
                    <div className="card-image-container">
                      <img
                        src={item.images[0]?.path}
                        alt={item.name.en}
                        className="card-image"
                      />
                      <div className="card-overlay">
                        <div className="card-content">
                          <h3 className="product-title">{item.name.en}</h3>
                          {/* <p className="product-category">{item.category.name}</p> */}
                          <div className="product-pricing">
                            <span className="current-price">
                            ${item.discount_price & item.sizes[0]?.price ? +item.discount_price + +item.sizes[0]?.price : +item.price + +item.sizes[0]?.price}
                            </span>
                            {item.price && (
                              <span className="original-price">
                              {item.discount_price & item.sizes[0]?.price ?  `$ ${+item.price + +item.sizes[0]?.price}`: '' }
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
<Footer/>
    </div>
  );
};

export default WishlistPage;
