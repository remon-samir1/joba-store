"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type {
  Product,
  Category,
  Order,
  Customer,
  Review,
  Cart,
  Wishlist,
  Coupon,
  Invoice,
  BlogPost,
} from "@/lib/api";

// Products hooks
export const useProducts = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => api.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => api.getProduct(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Partial<Product>) => api.createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: Partial<Product> }) =>
      api.updateProduct(id, product),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Categories hooks
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => api.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => api.getCategory(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: Partial<Category>) => api.createCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      category,
    }: {
      id: string;
      category: Partial<Category>;
    }) => api.updateCategory(id, category),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", id] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// Orders hooks
export const useOrders = (params?: {
  page?: number;
  limit?: number;
  status?: string;
}) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => api.getOrders(params),
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => api.getOrder(id),
    enabled: !!id,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Order["status"] }) =>
      api.updateOrderStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
  });
};

// Customers hooks
export const useCustomers = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => api.getCustomers(params),
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => api.getCustomer(id),
    enabled: !!id,
  });
};

// Reviews hooks
export const useReviews = (params?: {
  page?: number;
  limit?: number;
  product_id?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ["reviews", params],
    queryFn: () => api.getReviews(params),
  });
};

export const useUpdateReviewStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Review["status"] }) =>
      api.updateReviewStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

// Cart hooks
export const useCart = (sessionId?: string) => {
  const createDefaultCart = (): Cart => ({
    id: sessionId || `default_${Date.now()}`,
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
  });

  return useQuery({
    queryKey: ["cart", sessionId || ""],
    queryFn: async (): Promise<Cart> => {
      const defaultCart = createDefaultCart();

      try {
        const cart = await api.getCart(sessionId);

        // Validate cart structure
        if (!cart || typeof cart !== "object") {
          console.warn("Invalid cart data received, using default");
          return defaultCart;
        }

        // Ensure required fields exist
        const validatedCart: Cart = {
          id: cart.id || defaultCart.id,
          customer_id: cart.customer_id,
          session_id: cart.session_id || sessionId,
          items: Array.isArray(cart.items) ? cart.items : [],
          subtotal: typeof cart.subtotal === "number" ? cart.subtotal : 0,
          tax_amount: typeof cart.tax_amount === "number" ? cart.tax_amount : 0,
          shipping_amount:
            typeof cart.shipping_amount === "number" ? cart.shipping_amount : 0,
          total_amount:
            typeof cart.total_amount === "number" ? cart.total_amount : 0,
          currency: cart.currency || "EGP",
          created_at: cart.created_at || defaultCart.created_at,
          updated_at: cart.updated_at || defaultCart.updated_at,
        };

        return validatedCart;
      } catch (error) {
        console.log("Cart query failed, returning default cart:", error);
        return defaultCart;
      }
    },
    staleTime: 0, // Always fresh for cart
    retry: false, // Don't retry, just return default cart
    refetchOnWindowFocus: false,
    throwOnError: false, // Never throw errors, always return data
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: {
      product_id: string;
      quantity: number;
      session_id?: string;
    }) => api.addToCart(item),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cart", variables.session_id],
      });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      quantity,
      sessionId,
    }: {
      itemId: string;
      quantity: number;
      sessionId?: string;
    }) => api.updateCartItem(itemId, quantity),
    onSuccess: (_, { sessionId }) => {
      queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      sessionId,
    }: {
      itemId: string;
      sessionId?: string;
    }) => api.removeFromCart(itemId),
    onSuccess: (_, { sessionId }) => {
      queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId?: string) => api.clearCart(sessionId),
    onSuccess: (_, sessionId) => {
      queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
    },
  });
};

// Wishlist hooks
export const useWishlist = (customerId: string) => {
  return useQuery({
    queryKey: ["wishlist", customerId],
    queryFn: () => api.getWishlist(customerId),
    enabled: !!customerId,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      customerId,
      productId,
    }: {
      customerId: string;
      productId: string;
    }) => api.addToWishlist(customerId, productId),
    onSuccess: (_, { customerId }) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", customerId] });
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      customerId,
      productId,
    }: {
      customerId: string;
      productId: string;
    }) => api.removeFromWishlist(customerId, productId),
    onSuccess: (_, { customerId }) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", customerId] });
    },
  });
};

// Coupons hooks
export const useCoupons = (params?: {
  page?: number;
  limit?: number;
  status?: string;
}) => {
  return useQuery({
    queryKey: ["coupons", params],
    queryFn: () => api.getCoupons(params),
  });
};

export const useValidateCoupon = () => {
  return useMutation({
    mutationFn: ({
      code,
      orderAmount,
    }: {
      code: string;
      orderAmount?: number;
    }) => api.validateCoupon(code, orderAmount),
  });
};

// Invoices hooks
export const useInvoices = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  customer_id?: string;
}) => {
  return useQuery({
    queryKey: ["invoices", params],
    queryFn: () => api.getInvoices(params),
  });
};

// Blog hooks
export const useBlogPosts = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  tag?: string;
}) => {
  return useQuery({
    queryKey: ["blog", params],
    queryFn: () => api.getBlogPosts(params),
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => api.getBlogPost(slug),
    enabled: !!slug,
  });
};

// Search hooks
export const useSearch = (params: {
  q: string;
  type?: "products" | "all";
  page?: number;
  limit?: number;
  category?: string;
  min_price?: number;
  max_price?: number;
  sort_by?: "relevance" | "price_asc" | "price_desc" | "date" | "rating";
}) => {
  return useQuery({
    queryKey: ["search", params],
    queryFn: () => api.search(params),
    enabled: !!params.q && params.q.length > 0,
    staleTime: 30 * 1000, // 30 seconds
  });
};

// Analytics hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.getDashboardStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSalesAnalytics = (params?: {
  period?: "7d" | "30d" | "90d" | "1y";
  start_date?: string;
  end_date?: string;
}) => {
  return useQuery({
    queryKey: ["sales-analytics", params],
    queryFn: () => api.getSalesAnalytics(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Settings hooks
export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => api.getSettings(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: Parameters<typeof api.updateSettings>[0]) =>
      api.updateSettings(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};

// File upload hook
export const useFileUpload = () => {
  return useMutation({
    mutationFn: ({
      file,
      type,
    }: {
      file: File;
      type?: "product" | "category" | "blog" | "general";
    }) => api.uploadFile(file, type),
  });
};
