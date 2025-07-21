const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://goba-ecommerce.sunmedagency.com/api";
const USE_MOCK_DATA =
  process.env.NODE_ENV === "development" && !process.env.NEXT_PUBLIC_API_URL;

// Mock data for development
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Joint Pain Relief",
    description: "Natural joint pain relief supplement",
    price: 35.4,
    stock_quantity: 100,
    stock_status: "in-stock",
    status: "published",
    category_id: "1",
    category: { id: "1", name: "Natural Remedies" },
    images: ["/placeholder.svg"],
    sku: "JP001",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Neck & Back Support",
    description: "Therapeutic oil for neck and back pain",
    price: 28.9,
    stock_quantity: 50,
    stock_status: "in-stock",
    status: "published",
    category_id: "2",
    category: { id: "2", name: "Therapeutic Oils" },
    images: ["/placeholder.svg"],
    sku: "NB001",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const MOCK_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Natural Remedies",
    description: "Natural health remedies",
    product_count: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Therapeutic Oils",
    description: "Essential therapeutic oils",
    product_count: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Helper function to simulate API delay
const mockDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discounted_price?: number;
  stock_quantity: number;
  stock_status: "in-stock" | "low-stock" | "out-of-stock";
  status: "published" | "draft";
  category_id: string;
  category?: {
    id: string;
    name: string;
    description?: string;
  };
  tags?: string[];
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  images: string[];
  reviews?: Review[];
  average_rating?: number;
  total_reviews?: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_id: string;
  customer?: Customer;
  rating: number;
  title?: string;
  comment: string;
  status: "pending" | "approved" | "rejected";
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface Cart {
  id: string;
  customer_id?: string;
  session_id?: string;
  items: CartItem[];
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  total_amount: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  price: number;
  total: number;
}

export interface Wishlist {
  id: string;
  customer_id: string;
  items: WishlistItem[];
  created_at: string;
  updated_at: string;
}

export interface WishlistItem {
  id: string;
  product_id: string;
  product?: Product;
  added_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed_amount";
  value: number;
  min_order_amount?: number;
  max_discount_amount?: number;
  usage_limit?: number;
  used_count: number;
  status: "active" | "inactive" | "expired";
  starts_at?: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  order_id: string;
  customer_id: string;
  invoice_number: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  due_date: string;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  status: "published" | "draft";
  author_id?: string;
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  role: "admin" | "customer" | "manager";
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  product_count: number;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  customer?: Customer;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total_amount: number;
  items: OrderItem[];
  shipping_address: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  price: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    per_page: number;
  };
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<ApiResponse<T>> {
    // If using mock data in development
    if (USE_MOCK_DATA) {
      return this.getMockResponse<T>(endpoint, options);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers here if needed
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Ensure we always return a proper ApiResponse structure
      if (!data || typeof data !== "object") {
        throw new Error("Invalid response format");
      }

      return data;
    } catch (error) {
      console.error("API request failed, falling back to mock data:", error);
      // Fallback to mock data when API is unavailable
      return this.getMockResponse<T>(endpoint, options);
    }
  }

  private async getMockResponse<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<ApiResponse<T>> {
    await mockDelay(); // Simulate network delay

    if (USE_MOCK_DATA) {
      console.log(
        `🔧 Using mock data for ${endpoint} (API server not configured)`,
      );
    } else {
      console.log(
        `⚠️ API request failed for ${endpoint}, using mock data as fallback`,
      );
    }

    // Handle different endpoints
    if (endpoint.includes("/products")) {
      if (endpoint.includes("?")) {
        // Products list with pagination
        return {
          data: {
            data: MOCK_PRODUCTS,
            pagination: {
              current_page: 1,
              total_pages: 1,
              total_items: MOCK_PRODUCTS.length,
              per_page: 10,
            },
          } as any,
          status: 200,
        };
      } else {
        // Single product
        return {
          data: MOCK_PRODUCTS[0] as any,
          status: 200,
        };
      }
    }

    if (endpoint.includes("/categories")) {
      return {
        data: MOCK_CATEGORIES as any,
        status: 200,
      };
    }

    if (endpoint.includes("/cart")) {
      // Return empty cart
      return {
        data: {
          id: `mock_cart_${Date.now()}`,
          items: [],
          subtotal: 0,
          tax_amount: 0,
          shipping_amount: 0,
          total_amount: 0,
          currency: "EGP",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as any,
        status: 200,
      };
    }

    // Default empty response for other endpoints
    return {
      data: [] as any,
      status: 200,
    };
  }

  // Products API
  async getProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
  }): Promise<PaginatedResponse<Product>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.search) searchParams.set("search", params.search);
    if (params?.category) searchParams.set("category", params.category);
    if (params?.status) searchParams.set("status", params.status);

    const response = await this.request<PaginatedResponse<Product>>(
      `/products?${searchParams.toString()}`,
    );
    return response.data;
  }

  async getProduct(id: string): Promise<Product> {
    const response = await this.request<Product>(`/products/${id}`);
    return response.data;
  }

  async createProduct(product: Partial<Product>): Promise<Product> {
    const response = await this.request<Product>("/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
    return response.data;
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const response = await this.request<Product>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    });
    return response.data;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.request(`/products/${id}`, {
      method: "DELETE",
    });
  }

  // Categories API
  async getCategories(): Promise<Category[]> {
    const response = await this.request<Category[]>("/categories");
    return response.data;
  }

  async getCategory(id: string): Promise<Category> {
    const response = await this.request<Category>(`/categories/${id}`);
    return response.data;
  }

  async createCategory(category: Partial<Category>): Promise<Category> {
    const response = await this.request<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(category),
    });
    return response.data;
  }

  async updateCategory(
    id: string,
    category: Partial<Category>,
  ): Promise<Category> {
    const response = await this.request<Category>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
    });
    return response.data;
  }

  async deleteCategory(id: string): Promise<void> {
    await this.request(`/categories/${id}`, {
      method: "DELETE",
    });
  }

  // Orders API
  async getOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<Order>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.status) searchParams.set("status", params.status);

    const response = await this.request<PaginatedResponse<Order>>(
      `/orders?${searchParams.toString()}`,
    );
    return response.data;
  }

  async getOrder(id: string): Promise<Order> {
    const response = await this.request<Order>(`/orders/${id}`);
    return response.data;
  }

  async updateOrderStatus(id: string, status: Order["status"]): Promise<Order> {
    const response = await this.request<Order>(`/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    return response.data;
  }

  // Customers API
  async getCustomers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResponse<Customer>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.search) searchParams.set("search", params.search);

    const response = await this.request<PaginatedResponse<Customer>>(
      `/customers?${searchParams.toString()}`,
    );
    return response.data;
  }

  async getCustomer(id: string): Promise<Customer> {
    const response = await this.request<Customer>(`/customers/${id}`);
    return response.data;
  }

  async createCustomer(customer: Partial<Customer>): Promise<Customer> {
    const response = await this.request<Customer>("/customers", {
      method: "POST",
      body: JSON.stringify(customer),
    });
    return response.data;
  }

  async updateCustomer(
    id: string,
    customer: Partial<Customer>,
  ): Promise<Customer> {
    const response = await this.request<Customer>(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(customer),
    });
    return response.data;
  }

  // Reviews API
  async getReviews(params?: {
    page?: number;
    limit?: number;
    product_id?: string;
    status?: string;
  }): Promise<PaginatedResponse<Review>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.product_id) searchParams.set("product_id", params.product_id);
    if (params?.status) searchParams.set("status", params.status);

    const response = await this.request<PaginatedResponse<Review>>(
      `/reviews?${searchParams.toString()}`,
    );
    return response.data;
  }

  async getReview(id: string): Promise<Review> {
    const response = await this.request<Review>(`/reviews/${id}`);
    return response.data;
  }

  async createReview(review: Partial<Review>): Promise<Review> {
    const response = await this.request<Review>("/reviews", {
      method: "POST",
      body: JSON.stringify(review),
    });
    return response.data;
  }

  async updateReviewStatus(
    id: string,
    status: Review["status"],
  ): Promise<Review> {
    const response = await this.request<Review>(`/reviews/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    return response.data;
  }

  async deleteReview(id: string): Promise<void> {
    await this.request(`/reviews/${id}`, {
      method: "DELETE",
    });
  }

  // Cart API
  async getCart(sessionId?: string): Promise<Cart> {
    try {
      const params = sessionId ? `?session_id=${sessionId}` : "";
      const response = await this.request<Cart>(`/cart${params}`);

      // Ensure response.data exists and is valid
      if (!response?.data) {
        throw new Error("Invalid cart response");
      }

      return response.data;
    } catch (error) {
      console.log(
        `Cart not found or API error for session ${sessionId}:`,
        error,
      );

      // Return empty cart if cart doesn't exist or API fails
      const emptyCart: Cart = {
        id: sessionId || `temp_${Date.now()}`,
        customer_id: undefined,
        session_id: sessionId,
        items: [],
        subtotal: 0,
        tax_amount: 0,
        shipping_amount: 0,
        total_amount: 0,
        currency: "EGP",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      return emptyCart;
    }
  }

  async addToCart(item: {
    product_id: string;
    quantity: number;
    session_id?: string;
  }): Promise<Cart> {
    const response = await this.request<Cart>("/cart/items", {
      method: "POST",
      body: JSON.stringify(item),
    });
    return response.data;
  }

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    const response = await this.request<Cart>(`/cart/items/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    return response.data;
  }

  async removeFromCart(itemId: string): Promise<Cart> {
    const response = await this.request<Cart>(`/cart/items/${itemId}`, {
      method: "DELETE",
    });
    return response.data;
  }

  async clearCart(sessionId?: string): Promise<void> {
    try {
      const params = sessionId ? `?session_id=${sessionId}` : "";
      await this.request(`/cart/clear${params}`, {
        method: "DELETE",
      });
    } catch (error) {
      // Silently handle case where cart doesn't exist
      console.log("Cart already empty or doesn't exist");
    }
  }

  // Wishlist API
  async getWishlist(customerId: string): Promise<Wishlist> {
    const response = await this.request<Wishlist>(
      `/customers/${customerId}/wishlist`,
    );
    return response.data;
  }

  async addToWishlist(
    customerId: string,
    productId: string,
  ): Promise<Wishlist> {
    const response = await this.request<Wishlist>(
      `/customers/${customerId}/wishlist`,
      {
        method: "POST",
        body: JSON.stringify({ product_id: productId }),
      },
    );
    return response.data;
  }

  async removeFromWishlist(
    customerId: string,
    productId: string,
  ): Promise<Wishlist> {
    const response = await this.request<Wishlist>(
      `/customers/${customerId}/wishlist/${productId}`,
      {
        method: "DELETE",
      },
    );
    return response.data;
  }

  // Coupons API
  async getCoupons(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<Coupon>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.status) searchParams.set("status", params.status);

    const response = await this.request<PaginatedResponse<Coupon>>(
      `/coupons?${searchParams.toString()}`,
    );
    return response.data;
  }

  async getCoupon(id: string): Promise<Coupon> {
    const response = await this.request<Coupon>(`/coupons/${id}`);
    return response.data;
  }

  async validateCoupon(code: string, orderAmount?: number): Promise<Coupon> {
    const response = await this.request<Coupon>(`/coupons/validate`, {
      method: "POST",
      body: JSON.stringify({ code, order_amount: orderAmount }),
    });
    return response.data;
  }

  async createCoupon(coupon: Partial<Coupon>): Promise<Coupon> {
    const response = await this.request<Coupon>("/coupons", {
      method: "POST",
      body: JSON.stringify(coupon),
    });
    return response.data;
  }

  async updateCoupon(id: string, coupon: Partial<Coupon>): Promise<Coupon> {
    const response = await this.request<Coupon>(`/coupons/${id}`, {
      method: "PUT",
      body: JSON.stringify(coupon),
    });
    return response.data;
  }

  async deleteCoupon(id: string): Promise<void> {
    await this.request(`/coupons/${id}`, {
      method: "DELETE",
    });
  }

  // Invoices API
  async getInvoices(params?: {
    page?: number;
    limit?: number;
    status?: string;
    customer_id?: string;
  }): Promise<PaginatedResponse<Invoice>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.status) searchParams.set("status", params.status);
    if (params?.customer_id)
      searchParams.set("customer_id", params.customer_id);

    const response = await this.request<PaginatedResponse<Invoice>>(
      `/invoices?${searchParams.toString()}`,
    );
    return response.data;
  }

  async getInvoice(id: string): Promise<Invoice> {
    const response = await this.request<Invoice>(`/invoices/${id}`);
    return response.data;
  }

  async createInvoice(invoice: Partial<Invoice>): Promise<Invoice> {
    const response = await this.request<Invoice>("/invoices", {
      method: "POST",
      body: JSON.stringify(invoice),
    });
    return response.data;
  }

  async updateInvoiceStatus(
    id: string,
    status: Invoice["status"],
  ): Promise<Invoice> {
    const response = await this.request<Invoice>(`/invoices/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    return response.data;
  }

  // Blog API
  async getBlogPosts(params?: {
    page?: number;
    limit?: number;
    status?: string;
    tag?: string;
  }): Promise<PaginatedResponse<BlogPost>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.status) searchParams.set("status", params.status);
    if (params?.tag) searchParams.set("tag", params.tag);

    const response = await this.request<PaginatedResponse<BlogPost>>(
      `/blog?${searchParams.toString()}`,
    );
    return response.data;
  }

  async getBlogPost(slug: string): Promise<BlogPost> {
    const response = await this.request<BlogPost>(`/blog/${slug}`);
    return response.data;
  }

  async createBlogPost(post: Partial<BlogPost>): Promise<BlogPost> {
    const response = await this.request<BlogPost>("/blog", {
      method: "POST",
      body: JSON.stringify(post),
    });
    return response.data;
  }

  async updateBlogPost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    const response = await this.request<BlogPost>(`/blog/${id}`, {
      method: "PUT",
      body: JSON.stringify(post),
    });
    return response.data;
  }

  async deleteBlogPost(id: string): Promise<void> {
    await this.request(`/blog/${id}`, {
      method: "DELETE",
    });
  }

  // Search API
  async search(params: {
    q: string;
    type?: "products" | "all";
    page?: number;
    limit?: number;
    category?: string;
    min_price?: number;
    max_price?: number;
    sort_by?: "relevance" | "price_asc" | "price_desc" | "date" | "rating";
  }): Promise<{
    products: PaginatedResponse<Product>;
    categories?: Category[];
    total_results: number;
  }> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, value.toString());
      }
    });

    const response = await this.request<{
      products: PaginatedResponse<Product>;
      categories?: Category[];
      total_results: number;
    }>(`/search?${searchParams.toString()}`);
    return response.data;
  }

  // Authentication API
  async login(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    const response = await this.request<{ user: User; token: string }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      },
    );
    return response.data;
  }

  async register(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone?: string;
  }): Promise<{ user: User; token: string }> {
    const response = await this.request<{ user: User; token: string }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(userData),
      },
    );
    return response.data;
  }

  async logout(): Promise<void> {
    await this.request("/auth/logout", {
      method: "POST",
    });
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await this.request<{ message: string }>(
      "/auth/forgot-password",
      {
        method: "POST",
        body: JSON.stringify({ email }),
      },
    );
    return response.data;
  }

  async resetPassword(
    token: string,
    password: string,
  ): Promise<{ message: string }> {
    const response = await this.request<{ message: string }>(
      "/auth/reset-password",
      {
        method: "POST",
        body: JSON.stringify({ token, password }),
      },
    );
    return response.data;
  }

  // Analytics API
  async getDashboardStats(): Promise<{
    total_orders: number;
    total_customers: number;
    total_products: number;
    total_revenue: number;
    orders_today: number;
    revenue_today: number;
    low_stock_products: number;
    pending_orders: number;
  }> {
    const response = await this.request<{
      total_orders: number;
      total_customers: number;
      total_products: number;
      total_revenue: number;
      orders_today: number;
      revenue_today: number;
      low_stock_products: number;
      pending_orders: number;
    }>("/analytics/dashboard");
    return response.data;
  }

  async getSalesAnalytics(params?: {
    period?: "7d" | "30d" | "90d" | "1y";
    start_date?: string;
    end_date?: string;
  }): Promise<{
    sales_data: Array<{ date: string; sales: number; orders: number }>;
    top_products: Array<{ product: Product; sales: number; orders: number }>;
    top_categories: Array<{
      category: Category;
      sales: number;
      orders: number;
    }>;
  }> {
    const searchParams = new URLSearchParams();
    if (params?.period) searchParams.set("period", params.period);
    if (params?.start_date) searchParams.set("start_date", params.start_date);
    if (params?.end_date) searchParams.set("end_date", params.end_date);

    const response = await this.request<{
      sales_data: Array<{ date: string; sales: number; orders: number }>;
      top_products: Array<{ product: Product; sales: number; orders: number }>;
      top_categories: Array<{
        category: Category;
        sales: number;
        orders: number;
      }>;
    }>(`/analytics/sales?${searchParams.toString()}`);
    return response.data;
  }

  // Settings API
  async getSettings(): Promise<{
    store_name: string;
    store_description: string;
    store_email: string;
    store_phone: string;
    store_address: string;
    currency: string;
    timezone: string;
    language: string;
    tax_rate: number;
    shipping_rate: number;
  }> {
    const response = await this.request<{
      store_name: string;
      store_description: string;
      store_email: string;
      store_phone: string;
      store_address: string;
      currency: string;
      timezone: string;
      language: string;
      tax_rate: number;
      shipping_rate: number;
    }>("/settings");
    return response.data;
  }

  async updateSettings(
    settings: Partial<{
      store_name: string;
      store_description: string;
      store_email: string;
      store_phone: string;
      store_address: string;
      currency: string;
      timezone: string;
      language: string;
      tax_rate: number;
      shipping_rate: number;
    }>,
  ): Promise<void> {
    await this.request("/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    });
  }

  // File Upload API
  async uploadFile(
    file: File,
    type: "product" | "category" | "blog" | "general" = "general",
  ): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    const response = await this.request<{ url: string; filename: string }>(
      "/upload",
      {
        method: "POST",
        body: formData,
        headers: {
          // Don't set Content-Type for FormData, let browser set it
        },
      },
    );
    return response.data;
  }
}

export const api = new ApiService();
