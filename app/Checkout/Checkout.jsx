import React, { useEffect, useState } from "react";
// import './CheckOut.css'
import { Header } from "../../src/components/Header";
import { useRef } from "react";
import { Axios } from "../../components/Helpers/Axios";
import { Footer } from "../../components/Footer";
const CheckoutPage = () => {
  const scrollRef = useRef();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    Axios.get("/cart").then(
      (data) => {
        setCart(data.data.data.items);
        console.log(data.data.data.items);
      },
    );
  }, []);
  const total = cart?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  useEffect(()=>{
    scrollRef.current.scrollIntoView({behavoir:'smooth'})
  },[])
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
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
    <div className="checkout-page " ref={scrollRef}>
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
                      <label htmlFor="first_name">First Name</label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="First name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Last name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address Line</label>
                    <textarea
                      id="address"
                      name="address"
                      placeholder="Address line"
                      value={formData.address}
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
                        EGP {total}
                      </span>
                    </div>
                    <div className="totals-row">
                      <span className="totals-label">Shipping</span>
                      <span className="totals-value">
                      Free Shipping
                      </span>
                    </div>
                    <div className="totals-row total-row">
                      <span className="totals-label">Total</span>
                      <span className="totals-value">
                        EGP {total}
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
    <Footer/>
    </div>
  );
};

export default CheckoutPage;
