import React, { useEffect, useState, useRef } from "react";
import "./CheckOut.css";
import { Header } from "../../src/components/Header";
import { Axios } from "../../components/Helpers/Axios";
import { Footer } from "../../components/Footer";
import { toast } from "react-toastify";
import Notifcation from "../../components/Notification";
import Loading from "../../components/Loading/Loading";
import image from "../../src/assets/done.svg";
import { Link } from "react-router-dom";
const CheckoutPage = () => {
  const scrollRef = useRef();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    Axios.get("/cart").then((data) => {
      setCart(data.data.data.items);
    });
  }, []);

  const total = cart?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const [formData, setFormData] = useState({
    shipping_email: "",
    shipping_name: "",
    shipping_address: "",
    shipping_city: "",
    shipping_state: "",
    shipping_zip: "",
    shipping_country: "Indonesia",
    coupon_code: "",
    payment_method: "cash",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const items = cart.map((item) => ({
      product_id: item.product.id,
      // product_size_id: item.size_id || null,
      quantity: item.quantity,
    }));

    const payload = {
      payment_method: formData.payment_method,
      items,
      shipping_name: formData.shipping_name,
      shipping_address: formData.shipping_address,
      shipping_city: formData.shipping_city,
      shipping_state: formData.shipping_state,
      shipping_zip: formData.shipping_zip,
      shipping_country: formData.shipping_country,
      shipping_email: formData.shipping_email,
      coupon_code: formData.coupon_code || null,
    };
    console.log(payload);
    try {
      const response = await Axios.post("/orders", payload);
      console.log(response);
      toast.success("Order placed successfully!");
      setLoading(false);
      setDone(true)
    } catch (error) {
      console.error("Order error:", error.response?.data);
      if(items.length === 0){
        toast.warn('Please Add Items To Cart First')
      }
      toast.error("Order failed. Please check your inputs.");
      setLoading(false);
    }
  };

  return (
    <div ref={scrollRef}>
                {loading && <Loading />}
      {done ? (
        <div className="">
          <Header/>
          
    <div className="w-[90%] max-w-2xl mx-auto p-8 mt-12 mb-16 bg-white shadow-lg rounded-xl flex flex-col justify-center items-center text-center space-y-6">
      <div className="w-28 h-28">
        <img src={image} alt="Order Done" className="w-full h-full object-contain" />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-800">Thanks for your order!</h3>
      
      <p className="text-base text-gray-600 leading-relaxed">
        A proforma invoice has been issued and sent to your email. Our Juba team will be in touch shortly to confirm the payment.
      </p>
      
      <Link to="/" className="inline-block text-white bg-primary hover:bg-primary/90 px-8 py-2 rounded-full transition">
        Continue shopping
      </Link>
    </div>
          <Footer/>
        </div>
      ) : (
        <div className="checkout-page" >
          <Header />

          <Notifcation />

          <main className="checkout-main">
            <div className="container">
              {/* Checkout Header */}
              <div className="checkout-header">
                <h1 className="checkout-title">Checkout</h1>
                <p className="checkout-description">
                  Please enter your details to complete your order.
                </p>
              </div>

              {/* Checkout Content */}
              <div className="checkout-content">
                {/* Left Side - Form */}
                <div className="checkout-form-section">
                  <form onSubmit={handleSubmit}>
                    <div className="form-section">
                      <h2 className="section-title">Shipping Information</h2>

                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="shipping_email"
                          placeholder="Email"
                          value={formData.shipping_email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="shipping_name"
                          placeholder="Full name"
                          value={formData.shipping_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Address</label>
                        <textarea
                          name="shipping_address"
                          placeholder="Address"
                          value={formData.shipping_address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            name="shipping_city"
                            value={formData.shipping_city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>State</label>
                          <input
                            type="text"
                            name="shipping_state"
                            value={formData.shipping_state}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Zip Code</label>
                          <input
                            type="text"
                            name="shipping_zip"
                            value={formData.shipping_zip}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            name="shipping_country"
                            value={formData.shipping_country}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Coupon Code (optional)</label>
                        <input
                          type="text"
                          name="coupon_code"
                          value={formData.coupon_code}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Payment Method</label>
                        <select
                          name="payment_method"
                          value={formData.payment_method}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="cash">Cash</option>
                          <option value="credit_card">Credit Card</option>
                        </select>
                      </div>

                      <button type="submit" className="checkout-submit-btn">
                        Submit Order
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right Side - Summary */}
                <div className="order-summary-section">
                  <div className="order-summary">
                    <h3 className="totals-title">Cart Totals</h3>

                    {cart?.map((item, idx) => (
                      <div className="totals-row" key={idx}>
                        <span>
                          {item.product.name.en} × {item.quantity}
                        </span>
                        <span>{item.product.price * item.quantity} EGP</span>
                      </div>
                    ))}

                    <div className="totals-row total-row">
                      <span>Total</span>
                      <span>EGP {total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
