import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CategoriesPage from "./pages/CategoriesPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import AddProductPage from "./pages/dashboard/AddProductPage";
import ProductListPage from "./pages/dashboard/ProductListPage";
import OrdersPage from "./pages/dashboard/OrdersPage";
import CustomersPage from "./pages/dashboard/CustomersPage";
import CouponsPage from "./pages/dashboard/CouponsPage";
import CategoriesManagementPage from "./pages/dashboard/CategoriesManagementPage";
import InvoicesPage from "./pages/dashboard/InvoicesPage";
import PopupMakerPage from "./pages/dashboard/PopupMakerPage";
import ReviewsPage from "./pages/dashboard/ReviewsPage";
import ProfilePage from "./pages/ProfilePage";
import HelpPage from "./pages/HelpPage";
import SupportPage from "./pages/SupportPage";
import NotFound from "./pages/NotFound";
import { ProductHero } from "../components/product/ProductHero";
import { ProductDetails } from "../components/product/ProductDetails";
import ProductDetailPage from "../app/products/[id]/ProductDetailPage";
import AdminLogin from "../components/AdminLogin/AdminLogin.jsx";
import CartPage from "../app/cart/CartPage.jsx";
import BlogPage from "../app/blog/Blog.jsx";
import WishlistPage from "../app/wishlist/Wishlits.jsx";
import CheckoutPage from "../app/Checkout/Checkout.jsx";
import AddCategory from "./pages/dashboard/AddCategory";
import UpdateCategory from "./pages/dashboard/UpdateCategory";
import { CouponManagement } from "./pages/dashboard/AddCoupon/AddCounpon";
import UpdateProduct from "./pages/dashboard/UpdateProduct";

import { Settings } from "./pages/dashboard/Settings";
import InvoicesDetails from "./pages/dashboard/InvoicesDetails.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import SingleBlog from "../app/blog/singleBlog";
import ContactsManagementPage from "./pages/dashboard/ContactsManagementPage";
import BlogsManagement from "./pages/dashboard/BlogsManagement";
import AddBlog from "./pages/dashboard/AddBlog";
import UpdateBlogs from "./pages/dashboard/UpdateBlogs";
// import AddCoupon from "./pages/dashboard/AddCoupon";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help" element={<HelpPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/categories/:id" element={<CategoriesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route  element={<  RequireAuth />} >
    

          <Route
            path="/dashboard/*"
            element={
              <DashboardLayout>
                <Routes>
                  <Route index element={<DashboardPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="customers" element={<CustomersPage />} />
                  <Route path="coupons" element={<CouponsPage />} />
                  <Route path="coupons/add" element={<CouponManagement />} />
                  <Route
                    path="categories"
                    element={<CategoriesManagementPage />}
                  />
                  <Route
                    path="contacts"
                    element={<ContactsManagementPage />}
                  />
                  <Route
                    path="blogs"
                    element={<BlogsManagement />}
                  />
                  <Route
                    path="blogs/edit/:id"
                    element={<UpdateBlogs />}
                  />
                  <Route
                    path="blogs/add"
                    element={<AddBlog />}
                  />
                  <Route path="categories/add" element={<AddCategory />} />
                  <Route
                    path="categories/edit/:id"
                    element={<UpdateCategory />}
                  />
                  <Route path="invoices" element={<InvoicesPage />} />
                  <Route path="invoices/:id" element={<InvoicesDetails />} />
                  <Route path="popup-maker" element={<PopupMakerPage />} />
                  <Route path="products" element={<ProductListPage />} />
                  <Route path="products/add" element={<AddProductPage />} />
                  <Route path="products/edit/:id" element={<UpdateProduct />} />
                  <Route path="reviews" element={<ReviewsPage />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </DashboardLayout>
            }
            />
            </Route>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
