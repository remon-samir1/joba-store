import React, { useState } from "react";
import './checkout.css'
import { Header } from "../../src/components/Header";
const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    addressLine: "",
    country: "Indonesia",
    postalCode: "",
    phoneNumber: "",
    sameAsShipping: true,
    couponCode: "",
  });

  const [orderSummary] = useState({
    subtotal: 210,
    shipping: 0,
    total: 3000,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checkout submitted:", formData);
  };

  return (
    <div className="checkout-page">
      {/* Header */}
    <Header/>

      {/* Breadcrumb Line */}
      {/* <div className="breadcrumb-separator"></div> */}

      {/* Main Content */}
      <main className="checkout-main">
        <div className="container">
          {/* Title Section */}
          <div className="checkout-header">
            <h1 className="checkout-title">Checkout</h1>
            <p className="checkout-description">
              Lorem ipsum dolor sit amet consectetur. Quis cras amet ac
              tincidunt mauris scelerisque elementum nulla id. Mattis sed et
              orci adipiscing. Egestas consectetur sed pharetra odio ridiculus.
              Aliquam bibendum nunc orci bibendum hendrerit tempor maecenas
              molestie. Sagittis venenatis id malesuada sagittis id sapien
              gravida ut.
            </p>
          </div>

          {/* Checkout Form Layout */}
          <div className="checkout-content">
            {/* Left Side - Checkout Form */}
            <div className="checkout-form-section">
              <form onSubmit={handleSubmit}>
                {/* Customer Email */}
                <div className="form-section">
                  <h2 className="section-title">Customer Email</h2>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <p className="sign-in-link">
                    Already have an account? Sign in
                  </p>
                </div>

                {/* Shipping Address */}
                <div className="form-section">
                  <h2 className="section-title">Shipping Address</h2>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="addressLine">Address Line</label>
                    <textarea
                      id="addressLine"
                      name="addressLine"
                      placeholder="Address line"
                      value={formData.addressLine}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Indonesia">Indonesia</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="postalCode">Postal Code</label>
                      <select
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Postal Code</option>
                        <option value="12345">12345</option>
                        <option value="67890">67890</option>
                        <option value="54321">54321</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Phone number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div className="form-section">
                  <h2 className="section-title">Billing Address</h2>
                  <div className="checkbox-group">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="sameAsShipping"
                        name="sameAsShipping"
                        checked={formData.sameAsShipping}
                        onChange={handleInputChange}
                      />
                      <label
                        htmlFor="sameAsShipping"
                        className="checkbox-label"
                      >
                        Same as shipping address
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Side - Order Summary */}
            <div className="order-summary-section">
              <div className="order-summary">
                <div className="cart-totals-container">
                  <h3 className="totals-title">Cart Totals</h3>

                  <div className="totals-list">
                    <div className="totals-row">
                      <span className="totals-label">Subtotal</span>
                      <span className="totals-value">
                        EGP {orderSummary.subtotal}
                      </span>
                    </div>
                    <div className="totals-row">
                      <span className="totals-label">Shipping</span>
                      <span className="totals-value">
                        {orderSummary.shipping === 0
                          ? "Free Shipping"
                          : `EGP ${orderSummary.shipping}`}
                      </span>
                    </div>
                    <div className="totals-row total-row">
                      <span className="totals-label">Total</span>
                      <span className="totals-value">
                        EGP {orderSummary.total}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="coupon-section">
                  <div className="coupon-input-group">
                    <input
                      type="text"
                      name="couponCode"
                      placeholder="Coupon code"
                      value={formData.couponCode}
                      onChange={handleInputChange}
                      className="coupon-input"
                    />
                    <button type="button" className="apply-coupon-btn">
                      Apply
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="checkout-submit-btn"
                  onClick={handleSubmit}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/5ee4120163e3a103fb95e3b681a8c805e2f28224?width=263"
              alt="Joba Natural Hub"
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
              <span>8819 Ohio St. South Gate, CA 90280</span>
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
              <div className="social-icon">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.86091 2.52766C10.8924 1.49621 12.2913 0.916748 13.75 0.916748H16.5C17.0063 0.916748 17.4167 1.32715 17.4167 1.83341V5.50008C17.4167 6.00634 17.0063 6.41675 16.5 6.41675H13.75V8.25008H16.5C16.7823 8.25008 17.0488 8.38013 17.2225 8.60262C17.3962 8.82511 17.4578 9.11523 17.3893 9.38907L16.4726 13.0557C16.3706 13.4638 16.004 13.7501 15.5833 13.7501H13.75V20.1667C13.75 20.673 13.3396 21.0834 12.8333 21.0834H9.16667C8.66041 21.0834 8.25 20.673 8.25 20.1667V13.7501H6.41667C5.91041 13.7501 5.5 13.3397 5.5 12.8334V9.16675C5.5 8.66049 5.91041 8.25008 6.41667 8.25008H8.25V6.41675C8.25 4.95806 8.82946 3.55911 9.86091 2.52766ZM13.75 2.75008C12.7775 2.75008 11.8449 3.13639 11.1573 3.82402C10.4696 4.51166 10.0833 5.44429 10.0833 6.41675V9.16675C10.0833 9.67301 9.67293 10.0834 9.16667 10.0834H7.33333V11.9167H9.16667C9.67293 11.9167 10.0833 12.3272 10.0833 12.8334V19.2501H11.9167V12.8334C11.9167 12.3272 12.3271 11.9167 12.8333 11.9167H14.8676L15.326 10.0834H12.8333C12.3271 10.0834 11.9167 9.67301 11.9167 9.16675V6.41675C11.9167 5.93052 12.1098 5.4642 12.4536 5.12039C12.7975 4.77657 13.2638 4.58342 13.75 4.58342H15.5833V2.75008H13.75Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="social-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M9.48938 6.775L15.3176 0H13.9364L8.87588 5.8825L4.83388 0H0.171875L6.28412 8.8955L0.171875 16H1.55312L6.89738 9.78788L11.1659 16H15.8279L9.489 6.775H9.48938ZM7.59763 8.97375L6.97825 8.088L2.05075 1.03975H4.17225L8.14863 6.728L8.76787 7.61375L13.937 15.0075H11.8158L7.59763 8.97412V8.97375Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.34 5.46C17.1027 5.46 16.8707 5.53038 16.6733 5.66224C16.476 5.79409 16.3222 5.98151 16.2313 6.20078C16.1405 6.42005 16.1168 6.66133 16.1631 6.89411C16.2094 7.12689 16.3236 7.34071 16.4915 7.50853C16.6593 7.67635 16.8731 7.79064 17.1059 7.83694C17.3387 7.88324 17.5799 7.85948 17.7992 7.76866C18.0185 7.67783 18.2059 7.52402 18.3378 7.32668C18.4696 7.12935 18.54 6.89734 18.54 6.66C18.54 6.34174 18.4136 6.03652 18.1885 5.81147C17.9635 5.58643 17.6583 5.46 17.34 5.46ZM21.94 7.88C21.9204 7.05032 21.765 6.22945 21.48 5.45C21.2269 4.78255 20.831 4.17846 20.32 3.68C19.8248 3.16743 19.2196 2.77418 18.55 2.53C17.7727 2.23616 16.9508 2.07721 16.12 2.06C15.06 2 14.72 2 12 2C9.28 2 8.94 2 7.88 2.06C7.04915 2.07721 6.22734 2.23616 5.45 2.53C4.78198 2.77725 4.17736 3.17008 3.68 3.68C3.16743 4.17518 2.77418 4.78044 2.53 5.45C2.23616 6.22734 2.07721 7.04915 2.06 7.88C2 8.94 2 9.28 2 12C2 14.72 2 15.06 2.06 16.12C2.07721 16.9508 2.23616 17.7727 2.53 18.55C2.77418 19.2196 3.16743 19.8248 3.68 20.32C4.17736 20.8299 4.78198 21.2227 5.45 21.47C6.22734 21.7638 7.04915 21.9228 7.88 21.94C8.94 22 9.28 22 12 22C14.72 22 15.06 22 16.12 21.94C16.9508 21.9228 17.7727 21.7638 18.55 21.47C19.2196 21.2258 19.8248 20.8326 20.32 20.32C20.8322 19.8226 21.2283 19.2182 21.48 18.55C21.765 17.7705 21.9204 16.9497 21.94 16.12C21.94 15.06 22 14.72 22 12C22 9.28 22 8.94 21.94 7.88ZM20.14 16C20.1329 16.6348 20.0179 17.2638 19.8 17.86C19.6403 18.2952 19.3839 18.6884 19.05 19.01C18.7254 19.3403 18.3331 19.5961 17.9 19.76C17.3038 19.9779 16.6748 20.0929 16.04 20.1C15.04 20.15 14.67 20.16 12.04 20.16C9.41 20.16 9.04 20.16 8.04 20.1C7.38085 20.1129 6.72445 20.0114 6.1 19.8C5.68619 19.6273 5.3119 19.3721 5 19.05C4.66809 18.7287 4.41484 18.3352 4.26 17.9C4.01505 17.2954 3.8796 16.652 3.86 16C3.86 15 3.8 14.63 3.8 12C3.8 9.37 3.8 9 3.86 8C3.86365 7.35098 3.98214 6.70772 4.21 6.1C4.38605 5.67791 4.65627 5.30166 5 5C5.30292 4.65519 5.67863 4.38195 6.1 4.2C6.7094 3.97948 7.35194 3.8645 8 3.86C9 3.86 9.37 3.8 12 3.8C14.63 3.8 15 3.8 16 3.86C16.6348 3.86709 17.2638 3.98206 17.86 4.2C18.3144 4.36865 18.7223 4.64285 19.05 5C19.3767 5.30802 19.6326 5.68334 19.8 6.1C20.0224 6.70888 20.1375 7.35176 20.14 8C20.19 9 20.2 9.37 20.2 12C20.2 14.63 20.19 15 20.14 16ZM12 6.87C10.9858 6.87198 9.99496 7.17453 9.15265 7.73942C8.31035 8.30431 7.65438 9.1062 7.26763 10.0438C6.88089 10.9813 6.78072 12.0125 6.97979 13.0069C7.17886 14.0014 7.66824 14.9145 8.38608 15.631C9.10392 16.3474 10.018 16.835 11.0129 17.0321C12.0077 17.2293 13.0387 17.1271 13.9755 16.7385C14.9123 16.35 15.7129 15.6924 16.2761 14.849C16.8394 14.0056 17.14 13.0142 17.14 12C17.1413 11.3251 17.0092 10.6566 16.7512 10.033C16.4933 9.40931 16.1146 8.84281 15.6369 8.36605C15.1592 7.88929 14.5919 7.51168 13.9678 7.25493C13.3436 6.99818 12.6749 6.86736 12 6.87ZM12 15.33C11.3414 15.33 10.6976 15.1347 10.15 14.7688C9.60234 14.4029 9.17552 13.8828 8.92348 13.2743C8.67144 12.6659 8.6055 11.9963 8.73398 11.3503C8.86247 10.7044 9.17963 10.111 9.64533 9.64533C10.111 9.17963 10.7044 8.86247 11.3503 8.73398C11.9963 8.6055 12.6659 8.67144 13.2743 8.92348C13.8828 9.17552 14.4029 9.60234 14.7688 10.15C15.1347 10.6976 15.33 11.3414 15.33 12C15.33 12.4373 15.2439 12.8703 15.0765 13.2743C14.9092 13.6784 14.6639 14.0454 14.3547 14.3547C14.0454 14.6639 13.6784 14.9092 13.2743 15.0765C12.8703 15.2439 12.4373 15.33 12 15.33Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          @2020 Joba Ecommerce. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;
