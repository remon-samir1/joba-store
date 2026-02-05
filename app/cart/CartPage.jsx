import React, { useContext, useEffect, useState, useRef } from "react";
import "./CartPage.css";
import { Header } from "../../src/components/Header";
import { Axios } from "../../components/Helpers/Axios";
import Notifcation from "../../components/Notification";
import { toast } from "react-toastify";
import empty from "../../src/assets/joba-empty-cart.svg";
import { Link } from "react-router-dom";
import { CartCh } from "../../Context/CartContext";
import gsap from "gsap";
import { Footer } from "../../src/components/Footer";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const { t, i18n } = useTranslation();
  const cartcontext = useContext(CartCh);
  const [apply, setApply] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState("");
  const change = cartcontext.setCartChange;
  const changeState = cartcontext.cartChange;
  const [discountValue, setDiscountValue] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const cartRef = useRef(null);

  // GSAP animation for cart items
  useEffect(() => {
    if (cart.length > 0 && !isLoading) {
      gsap.from(".cart-item", {
        duration: 0.6,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }
  }, [cart, isLoading]);

  const removeItem = (slug, id, size) => {
    toast.info(t("Removing item..."), { autoClose: 1000 });

    Axios.post(`/cart/${slug}`, {
      _method: "DELETE",
      product_id: id,
      product_size_id: size,
    })
      .then((data) => {
        toast.success(t("Item removed successfully!"));
        change((prev) => !prev);
        setDeleted((prev) => !prev);
        // setCart((prev) => cart.filter((item) => item.product.slug !== slug));
      })
      .catch(() => {
        toast.error(t("Failed to remove item"));
      });
  };

  const subtotal = cart?.reduce(
    (sum, item) =>
      sum +
      (item.product.discount_price != 0
        ? +item.product.discount_price + +item.size?.price
        : +item.product.price + +item.size.price) *
        item.quantity,
    0,
  );
  const total = subtotal - discountValue;
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    gsap.to(`#quantity-${id}`, {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );

    const updatedItem = cart.find((item) => item.product.id === id);
    if (updatedItem) {
      Axios.patch(`/cart/${updatedItem.product.slug}`, {
        _method: "PUT",
        product_id: updatedItem.product.id,
        product_size_id: updatedItem.size.id,
        quantity: newQuantity,
      })
        .then((res) => {
          console.log(res);
          toast.success(t("Quantity updated!"));
          change((prev) => !prev);
        })
        .catch(() => {
          toast.error(t("Failed to update quantity"));
        });
    }
  };

  const applyCoupon = () => {
    if (!discount.trim()) {
      toast.warn(t("Please enter a coupon code"));
      return;
    }

    setIsLoading(true);
    setApply((prev) => !prev);
    toast.info(t("Applying coupon..."));
  };

  useEffect(() => {
    Axios.get(`/cart?coupon_code=${discount}`)
      .then((data) => {
        console.log(data.data);
        setCart(data.data.data.items);
        setDiscountValue(data.data.data);
        setIsLoading(false);

        if (discount) {
          if (data.data.data.discount) {
            toast.success(t("Coupon applied successfully!"));
          } else {
            toast.warning(t("Invalid coupon code"));
          }
        }
      })
      .catch(() => {
        toast.error(t("Failed to load cart"));
        setIsLoading(false);
      });
  }, [apply, deleted]);

  return (
    <div className="cart-page">
      <Notifcation />

      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>{t("Loading your cart...")}</p>
        </div>
      )}

      <Header />

      <section className="cart-section">
        <div className="container">
          <h2 className="section-title">{t("My Cart")}</h2>

          <div className="cart-table-container">
            <div className="cart-table-header">
              <span>{t("Product")}</span>
              <span>{t("Name")}</span>
              <span>{t("Quantity")}</span>
              <span>{t("Sub Total")}</span>
            </div>

            <div className="cart-items" ref={cartRef}>
              {cart.length === 0 && !isLoading ? (
                <div className="text-center">
                  <div className="flex w-full justify-center mx-auto h-96">
                    <img
                      src={empty}
                      alt="cart"
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-medium text-[#1D1919]">
                    {t("your cart is empty!")}
                  </h3>
                  <p className="text-[#656565] mt-4 max-w-80">
                    {/* Lorem ipsum dolor sit amet consectetur. Suspendisse proin
                    sagittis risus sed. */}
                  </p>
                </div>
              ) : (
                cart?.map((item) => (
                  <div key={item.id} className="cart-item">
                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeItem(
                          item.product.slug,
                          item.product.id,
                          item.size?.id,
                        )
                      }
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.0007 36.6667C29.2057 36.6667 36.6673 29.205 36.6673 20C36.6673 10.795 29.2057 3.33337 20.0007 3.33337C10.7957 3.33337 3.33398 10.795 3.33398 20C3.33398 29.205 10.7957 36.6667 20.0007 36.6667ZM26.7773 13.2234C27.0114 13.4577 27.1429 13.7755 27.1429 14.1067C27.1429 14.438 27.0114 14.7557 26.7773 14.99L21.7673 20L26.7757 25.0084C26.9965 25.2453 27.1167 25.5587 27.1109 25.8826C27.1052 26.2064 26.974 26.5154 26.745 26.7444C26.516 26.9734 26.207 27.1046 25.8832 27.1103C25.5594 27.116 25.2459 26.9958 25.009 26.775L20.0007 21.77L14.9923 26.7784C14.8779 26.9012 14.7399 26.9997 14.5865 27.068C14.4332 27.1363 14.2677 27.1731 14.0999 27.176C13.932 27.179 13.7653 27.1481 13.6097 27.0852C13.454 27.0224 13.3126 26.9288 13.1939 26.8101C13.0752 26.6914 12.9816 26.55 12.9188 26.3944C12.8559 26.2387 12.825 26.072 12.828 25.9042C12.831 25.7363 12.8677 25.5708 12.936 25.4175C13.0043 25.2641 13.1028 25.1261 13.2257 25.0117L18.2306 20L13.224 14.9917C13.1012 14.8773 13.0027 14.7393 12.9343 14.5859C12.866 14.4326 12.8293 14.2671 12.8263 14.0992C12.8234 13.9314 12.8542 13.7647 12.9171 13.609C12.98 13.4534 13.0736 13.312 13.1923 13.1933C13.311 13.0746 13.4523 12.981 13.608 12.9182C13.7636 12.8553 13.9304 12.8244 14.0982 12.8274C14.266 12.8303 14.4315 12.8671 14.5849 12.9354C14.7382 13.0037 14.8762 13.1022 14.9907 13.225L20.0007 18.23L25.009 13.2217C25.2434 12.9876 25.5611 12.8561 25.8923 12.8561C26.2236 12.8561 26.5413 12.9876 26.7757 13.2217"
                          fill="#F15A24"
                        />
                      </svg>
                    </button>

                    <div className="product-image">
                      <img
                        src={item.product.images[0]?.path}
                        alt={
                          i18n.language === "ar"
                            ? item.product.name?.ar || item.product.name?.en
                            : item.product.name?.en
                        }
                      />
                    </div>

                    <div className="product-name">
                      {i18n.language === "ar"
                        ? item.product.name?.ar || item.product.name?.en
                        : item.product.name?.en}
                    </div>
                    {/* <div className="product-name">{item.product.size?.name}</div> */}

                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span
                        id={`quantity-${item.product.id}`}
                        className="quantity"
                      >
                        {item.quantity}
                      </span>
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="item-total">
                      ${" "}
                      {(item.size
                        ? +item.size?.price - +item.product.discount_price
                        : +item.product.price - +item.product.discount_price) *
                        item.quantity}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Coupon Section */}

          {/* Cart Totals */}
          <div className="cart-totals md:p-6 ">
            <h3 className="totals-title">{t("Cart Totals")}</h3>
            <div className="totals-row">
              <span className="totals-label ">{t("Subtotal")}</span>
              <span className="totals-value">
                $ {discountValue?.subtotal?.toFixed(2)}
              </span>
            </div>
            {discount !== "" && (
              <div className="totals-row">
                <span className="totals-label">{t("Discount")}</span>
                <span className="totals-value">
                  - $ {discountValue?.discount?.toFixed(2)}
                </span>
              </div>
            )}
            <div className="totals-row">
              <span className="totals-label">{t("Shipping")}</span>
              <span className="totals-value">{t("Free Shipping")}</span>
            </div>
            <div className="totals-row total-row">
              <span className="totals-label">{t("Total")}</span>
              <span className="totals-value">
                $ {discountValue?.total?.toFixed(2)}
              </span>
            </div>
            <Link to="/checkout" className="checkout-btn">
              {t("Checkout")}
            </Link>
          </div>
        </div>
      </section>

      {/* Related Items */}
      <section className="related-items">
        <div className="container">
          <h2 className="section-title">{t("Related Items")}</h2>
          <div className="products-grid">
            {cart?.map((product) => (
              <Link
                to={`/products/${product.product?.slug}`}
                key={product.product.id}
                className="product-card"
              >
                <div className="product-image-container">
                  <img
                    src={product.product.images[0].path}
                    alt={
                      i18n.language === "ar"
                        ? product.product.name?.ar || product.product.name?.en
                        : product.product.name?.en
                    }
                  />
                  {/* <div className="sale-badge">SALE</div>
                  <button className="heart-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21.2913 4.58741C20.7805 4.07642 20.1741 3.67106 19.5066 3.3945C18.8392 3.11793 18.1238 2.97559 17.4013 2.97559C16.6788 2.97559 15.9634 3.11793 15.2959 3.3945C14.6285 3.67106 14.022 4.07642 13.5113 4.58741L12.4513 5.64741L11.3913 4.58741C10.3596 3.55572 8.96032 2.97612 7.50129 2.97612C6.04226 2.97612 4.64298 3.55572 3.61129 4.58741C2.5796 5.6191 2 7.01838 2 8.47741C2 9.93644 2.5796 11.3357 3.61129 12.3674L4.67129 13.4274L12.4513 21.2074L20.2313 13.4274L21.2913 12.3674C21.8023 11.8567 22.2076 11.2502 22.4842 10.5828C22.7608 9.91531 22.9031 9.1999 22.9031 8.47741C22.9031 7.75492 22.7608 7.03952 22.4842 6.37206C22.2076 5.7046 21.8023 5.09817 21.2913 4.58741V4.58741Z"
                        stroke="#F15A24"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button> */}
                  <div className="product-overlay">
                    <div className="product-info">
                      <h3 className="product-title">
                        {i18n.language === "ar"
                          ? product.product.name?.ar || product.product.name?.en
                          : product.product.name?.en}
                      </h3>
                      <div className="product-pricing">
                        <span className="current-price">
                          ${" "}
                          {/* {product.product.discount_price != 0
                            ? product.product.discount_price
                            : product.size.price} */}
                          {+product.size
                            ? +product.size?.price -
                              +product.product.discount_price
                            : +product.product.price -
                              +product.product.discount_price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CartPage;
