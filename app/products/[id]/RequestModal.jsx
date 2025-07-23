import React, { useState } from 'react';
import './RequestModal.css'
const OrderRequestModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addressLine: '',
    country: 'EGYPT',
    quantity: 3
  });

  const [orderTotals] = useState({
    quantity: 3,
    subtotal: 3000,
    shipping: 'Free Shipping',
    total: 3000
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order request submitted:', formData);
    // Handle form submission logic here
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="order-request-overlay">
      <div className="order-request-modal">
        <div className="order-request-content">
          {/* Order Request Form */}
          <div className="order-request-form">
            <h2 className="order-request-title">Order Request</h2>
            
            <form onSubmit={handleSubmit} className="request-form">
              {/* Name Fields */}
              <div className="form-row">
                <div className="form-field">
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
                <div className="form-field">
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

              {/* Email */}
              <div className="form-field">
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

              {/* Phone Number */}
              <div className="form-field">
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

              {/* Address */}
              <div className="form-field">
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

              {/* Country */}
              <div className="form-field">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="EGYPT">EGYPT</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="UAE">UAE</option>
                  <option value="SAUDI ARABIA">SAUDI ARABIA</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="form-field">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>
          </div>

          {/* Cart Totals */}
          <div className="order-summary">
            <h3 className="cart-totals-title">Cart Totals</h3>
            
            <div className="totals-breakdown">
              <div className="totals-item">
                <span className="totals-label">Quantity</span>
                <span className="totals-value">x {orderTotals.quantity}</span>
              </div>
              
              <div className="totals-item">
                <span className="totals-label">Subtotal</span>
                <span className="totals-value">EGP {orderTotals.subtotal}</span>
              </div>
              
              <div className="totals-item">
                <span className="totals-label">Shipping</span>
                <span className="totals-value">{orderTotals.shipping}</span>
              </div>
              
              <div className="totals-item total-final">
                <span className="totals-label">Total</span>
                <span className="totals-value">EGP {orderTotals.total}</span>
              </div>
            </div>

            <button type="submit" className="send-request-btn" onClick={handleSubmit}>
              Send Request
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OrderRequestModal;
