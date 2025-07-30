import React, { useEffect, useState, useRef } from "react";
import { Axios } from "../../components/Helpers/Axios";
import { Header } from "../../src/components/Header";
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
  
  // Define all styles as JavaScript objects
  const styles = {
    page: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f8f8f8'
    },
    container: {
      maxWidth: '1336px',
      margin: '0 auto',
      padding: '20px 7vw'
    },
    header: {
      maxWidth: '1173px',
      margin: '0 auto 80px',
      padding: '0 20px'
    },
    title: {
      color: '#333',
      fontSize: '40px',
      fontWeight: 600,
      marginBottom: '24px'
    },
    description: {
      color: '#666',
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: 1.6,
      maxWidth: '1132px'
    },
    content: {
      display: 'flex',
      // flexWrap:'wrap',
      justifyContent:'space-between',
      gap: '32px',
      alignItems: 'flex-start'
    },
    formSection: {
      flex: 1,
      maxWidth: '599px'
    },
    summarySection: {
      width: '400px',
      flexShrink: 0
    },
    sectionTitle: {
      color: '#333',
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '33px'
    },
    formGroup: {
      marginBottom: '21px'
    },
    label: {
      display: 'block',
      color: '#333',
      fontSize: '16px',
      fontWeight: 600,
      marginBottom: '12px'
    },
    input: {
      width: '100%',
      padding: '10px 19px',
      border: '1.156px solid #F15A24',
      borderRadius: '4.625px',
      backgroundColor: '#fff',
      fontSize: '16px',
      fontWeight: 400,
      color: '#333',
      outline: 'none'
    },
    textarea: {
      height: '115px',
      resize: 'vertical'
    },
    formRow: {
      display: 'flex',
      gap: '16px'
    },
    submitButton: {
      width: '100%',
      padding: '15px 20px',
      backgroundColor: '#F15A24',
      color: '#fff',
      border: 'none',
      borderRadius: '6.696px',
      fontSize: '16px',
      fontWeight: 700,
      cursor: 'pointer'
    },
    summary: {
      display: 'flex',
      flexDirection: 'column',
      gap: '42px'
    },
    totalsTitle: {
      color: '#333',
      fontSize: '20px',
      fontWeight: 600,
      padding: '20px',
      margin: 0
    },
    totalsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '27px 40px',
      borderBottom: '0.837px solid #e0e0e0'
    },
    totalRow: {
      fontWeight: 600
    },
    doneContainer: {
      width: '90%',
      maxWidth: '42rem',
      margin: '3rem auto 4rem',
      padding: '2rem',
      backgroundColor: '#fff',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      borderRadius: '0.75rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      gap: '1.5rem'
    },
    imageContainer: {
      width: '7rem',
      height: '7rem'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    },
    doneButton: {
      display: 'inline-block',
      color: '#fff',
      backgroundColor: '#F15A24',
      padding: '0.5rem 2rem',
      borderRadius: '9999px',
      textDecoration: 'none'
    },
    responsive: {
      /* Responsive styles would be implemented using window width checks */
    }
  };
  const [discount, setDiscount] = useState("");
  const [apply, setApply] = useState(false);
  useEffect(() => {
    Axios.get(`/cart?coupon_code=${discount}`).then((data) => {
      setCart(data.data.data.items);
      setDiscountValue(data.data.data.discount || 0);

      console.log(data);
      setIsLoading(false)
      if (discount) {
        if (data.data.data.discount) {
          toast.success("Coupon applied successfully!");
        } else {
          toast.warning("Invalid coupon code");
        }
      }
    });
  }, [apply]);
  const [isLoading, setIsLoading] = useState(false);

  const applyCoupon = () => {
    if (!discount.trim()) {
      toast.warn("Please enter a coupon code");
      return;
    }

    setIsLoading(true);
    setApply((prev) => !prev);
    toast.info("Applying coupon...");
  };
  const total = cart?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);


  const [discountValue, setDiscountValue] = useState(0);
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
    
    try {
      const response = await Axios.post("/orders", payload);
      toast.success("Order placed successfully!");
      setLoading(false);
      setDone(true)
    } catch (error) {
      if(items.length === 0){
        toast.warn('Please Add Items To Cart First')
      }
      toast.error("Order failed. Please check your inputs.");
      setLoading(false);
    }
  };

  return (
    <div ref={scrollRef}  style={styles.page}>
    {isLoading && (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading your Coupon...</p>
        </div>
      )}
      {done ? (
        <div>
          <Header/>
          <div style={styles.doneContainer}>
            <div style={styles.imageContainer}>
              <img src={image} alt="Order Done" style={styles.image} />
            </div>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#333' }}>
              Thanks for your order!
            </h3>
            
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              A proforma invoice has been issued and sent to your email. Our team will be in touch shortly to confirm the payment.
            </p>
            
            <Link to="/" style={styles.doneButton}>
              Continue shopping
            </Link>
          </div>
          <Footer/>
        </div>
      ) : (
        <div style={styles.page}>
          <Header />
          <Notifcation />

          <main style={styles.checkoutMain}>
            <div style={styles.container}>
              {/* Checkout Header */}
              <div style={styles.header}>
                <h1 style={styles.title}>Checkout</h1>
                <p style={styles.description}>
                  Please enter your details to complete your order.
                </p>
              </div>

              {/* Checkout Content */}
              <div className="flex-col md:flex-row" style={styles.content}>
                {/* Left Side - Form */}
                <div style={styles.formSection}>
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '34px' }}>
                      <h2 style={styles.sectionTitle}>Shipping Information</h2>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                          type="email"
                          name="shipping_email"
                          placeholder="Email"
                          value={formData.shipping_email}
                          onChange={handleInputChange}
                          required
                          style={styles.input}
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input
                          type="text"
                          name="shipping_name"
                          placeholder="Full name"
                          value={formData.shipping_name}
                          onChange={handleInputChange}
                          required
                          style={styles.input}
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Address</label>
                        <textarea
                          name="shipping_address"
                          placeholder="Address"
                          value={formData.shipping_address}
                          onChange={handleInputChange}
                          required
                          style={{...styles.input, ...styles.textarea}}
                        />
                      </div>

                      <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>City</label>
                          <input
                            type="text"
                            name="shipping_city"
                            value={formData.shipping_city}
                            onChange={handleInputChange}
                            required
                            style={styles.input}
                          />
                        </div>

                        <div style={styles.formGroup}>
                          <label style={styles.label}>State</label>
                          <input
                            type="text"
                            name="shipping_state"
                            value={formData.shipping_state}
                            onChange={handleInputChange}
                            required
                            style={styles.input}
                          />
                        </div>
                      </div>

                      <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Zip Code</label>
                          <input
                            type="text"
                            name="shipping_zip"
                            value={formData.shipping_zip}
                            onChange={handleInputChange}
                            required
                            style={styles.input}
                          />
                        </div>

                        <div style={styles.formGroup}>
                          <label style={styles.label}>Country</label>
                          <input
                            type="text"
                            name="shipping_country"
                            value={formData.shipping_country}
                            onChange={handleInputChange}
                            required
                            style={styles.input}
                          />
                        </div>
                      </div>

                      {/* <div style={styles.formGroup}>
                        <label style={styles.label}>Coupon Code (optional)</label>
                        <input
                          type="text"
                          name="coupon_code"
                          value={formData.coupon_code}
                          onChange={handleInputChange}
                          style={styles.input}
                        />
                      </div> */}

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Payment Method</label>
                        <select
                          name="payment_method"
                          value={formData.payment_method}
                          onChange={handleInputChange}
                          required
                          style={styles.input}
                        >
                          <option value="cash">Cash</option>
                          {/* <option value="credit_card">Credit Card</option> */}
                        </select>
                      </div>

                      <button type="submit" style={styles.submitButton}>
                        Submit Order
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right Side - Summary */}
                <div className=" " style={styles.summarySection}>
                  <div style={styles.summary}>
                    <h3 style={styles.totalsTitle}>Cart Totals</h3>

                    {cart?.map((item, idx) => (
                      <div style={styles.totalsRow} key={idx}>
                        <span>
                          {item.product.name.en} × {item.quantity}
                        </span>
                        <span>{item.product.price * item.quantity} EGP</span>
                      </div>
                    ))}

                    <div className="totals-row" style={{...styles.totalsRow, fontWeight: 600}}>
                      <span className="totals-label">Total</span>
                      <span>EGP {total}</span>
                    </div>
                    {discount !== "" && (
              <div className="totals-row">
                <span className="totals-label">Discount</span>
                <span className="totals-value">
                  - EGP {discountValue.toFixed(2)}
                </span>
              </div>
            )}
                  </div>
              <div className="coupon-section">
            <div className="coupon-container">
              <input
                type="text"
                placeholder="Coupon code"
                onChange={(e) => setDiscount(e.target.value)}
                className="coupon-input"
              />
              <button className="apply-btn" onClick={applyCoupon}>
                Apply
              </button>
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