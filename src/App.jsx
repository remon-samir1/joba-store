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
import CartPage from "../app/cart/CartPage";
import BlogPage from "../app/blog/Blog";
import WishlistPage from "../app/wishlist/Wishlits";
import CheckoutPage from "../app/Checkout/Checkout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/categories/:id" element={<CategoriesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route
            path="/dashboard/*"
            element={
              <DashboardLayout>
                <Routes>
                  <Route index element={<DashboardPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="customers" element={<CustomersPage />} />
                  <Route path="coupons" element={<CouponsPage />} />
                  <Route
                    path="categories"
                    element={<CategoriesManagementPage />}
                  />
                  <Route path="invoices" element={<InvoicesPage />} />
                  <Route path="popup-maker" element={<PopupMakerPage />} />
                  <Route path="products" element={<ProductListPage />} />
                  <Route path="products/add" element={<AddProductPage />} />
                  <Route path="reviews" element={<ReviewsPage />} />
                  <Route
                    path="settings"
                    element={
                      <div className="p-8">
                        <h1 className="text-2xl font-bold">Settings</h1>
                        <p>Settings page coming soon...</p>
                      </div>
                    }
                  />
                </Routes>
              </DashboardLayout>
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/help" element={<HelpPage />} />
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
