# 🔌 Complete API Integration Guide

## Overview

This document provides comprehensive details on how the entire Goba E-commerce application is integrated with the backend API at `https://goba-ecommerce.sunmedagency.com/api`.

## 🏗 Architecture

### API Service Layer (`lib/api.ts`)

- **Base URL**: `https://goba-ecommerce.sunmedagency.com/api`
- **Request Format**: JSON with proper headers
- **Error Handling**: Centralized error handling with retry logic
- **Authentication**: Bearer token support (when needed)

### React Query Integration (`lib/hooks/use-api.ts`)

- **Caching**: Intelligent caching with different stale times
- **Optimistic Updates**: Immediate UI updates with rollback on failure
- **Background Refetching**: Automatic data synchronization
- **Error Retry**: Configurable retry logic for failed requests

## 📊 Complete API Endpoints

### 🛍 Products API

| Method   | Endpoint         | Description                   | Hook                 |
| -------- | ---------------- | ----------------------------- | -------------------- |
| `GET`    | `/products`      | List products with pagination | `useProducts()`      |
| `GET`    | `/products/{id}` | Get single product            | `useProduct(id)`     |
| `POST`   | `/products`      | Create new product            | `useCreateProduct()` |
| `PUT`    | `/products/{id}` | Update product                | `useUpdateProduct()` |
| `DELETE` | `/products/{id}` | Delete product                | `useDeleteProduct()` |

**Query Parameters for Products:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search query
- `category`: Filter by category ID
- `status`: Filter by status (published/draft)
- `sort_by`: Sort order (relevance, price_asc, price_desc, date, rating)
- `min_price`: Minimum price filter
- `max_price`: Maximum price filter

### 🏷 Categories API

| Method   | Endpoint           | Description         | Hook                  |
| -------- | ------------------ | ------------------- | --------------------- |
| `GET`    | `/categories`      | List all categories | `useCategories()`     |
| `GET`    | `/categories/{id}` | Get single category | `useCategory(id)`     |
| `POST`   | `/categories`      | Create new category | `useCreateCategory()` |
| `PUT`    | `/categories/{id}` | Update category     | `useUpdateCategory()` |
| `DELETE` | `/categories/{id}` | Delete category     | `useDeleteCategory()` |

### 📦 Orders API

| Method | Endpoint              | Description                 | Hook                     |
| ------ | --------------------- | --------------------------- | ------------------------ |
| `GET`  | `/orders`             | List orders with pagination | `useOrders()`            |
| `GET`  | `/orders/{id}`        | Get single order            | `useOrder(id)`           |
| `PUT`  | `/orders/{id}/status` | Update order status         | `useUpdateOrderStatus()` |

**Order Statuses:**

- `pending`: Order placed, awaiting processing
- `processing`: Order being prepared
- `shipped`: Order sent to customer
- `delivered`: Order received by customer
- `cancelled`: Order cancelled

### 👥 Customers API

| Method | Endpoint          | Description                    | Hook                  |
| ------ | ----------------- | ------------------------------ | --------------------- |
| `GET`  | `/customers`      | List customers with pagination | `useCustomers()`      |
| `GET`  | `/customers/{id}` | Get single customer            | `useCustomer(id)`     |
| `POST` | `/customers`      | Create new customer            | `useCreateCustomer()` |
| `PUT`  | `/customers/{id}` | Update customer                | `useUpdateCustomer()` |

### ⭐ Reviews API

| Method   | Endpoint               | Description                  | Hook                      |
| -------- | ---------------------- | ---------------------------- | ------------------------- |
| `GET`    | `/reviews`             | List reviews with pagination | `useReviews()`            |
| `GET`    | `/reviews/{id}`        | Get single review            | `useReview(id)`           |
| `POST`   | `/reviews`             | Create new review            | `useCreateReview()`       |
| `PUT`    | `/reviews/{id}/status` | Update review status         | `useUpdateReviewStatus()` |
| `DELETE` | `/reviews/{id}`        | Delete review                | `useDeleteReview()`       |

**Review Statuses:**

- `pending`: Awaiting moderation
- `approved`: Visible to public
- `rejected`: Hidden from public

### 🛒 Cart API

| Method   | Endpoint           | Description               | Hook                  |
| -------- | ------------------ | ------------------------- | --------------------- |
| `GET`    | `/cart`            | Get current cart          | `useCart()`           |
| `POST`   | `/cart/items`      | Add item to cart          | `useAddToCart()`      |
| `PUT`    | `/cart/items/{id}` | Update cart item quantity | `useUpdateCartItem()` |
| `DELETE` | `/cart/items/{id}` | Remove item from cart     | `useRemoveFromCart()` |
| `DELETE` | `/cart/clear`      | Clear entire cart         | `useClearCart()`      |

### ❤️ Wishlist API

| Method   | Endpoint                                | Description           | Hook                      |
| -------- | --------------------------------------- | --------------------- | ------------------------- |
| `GET`    | `/customers/{id}/wishlist`              | Get customer wishlist | `useWishlist()`           |
| `POST`   | `/customers/{id}/wishlist`              | Add item to wishlist  | `useAddToWishlist()`      |
| `DELETE` | `/customers/{id}/wishlist/{product_id}` | Remove from wishlist  | `useRemoveFromWishlist()` |

### 🎫 Coupons API

| Method   | Endpoint            | Description          | Hook                  |
| -------- | ------------------- | -------------------- | --------------------- |
| `GET`    | `/coupons`          | List coupons         | `useCoupons()`        |
| `GET`    | `/coupons/{id}`     | Get single coupon    | `useCoupon()`         |
| `POST`   | `/coupons/validate` | Validate coupon code | `useValidateCoupon()` |
| `POST`   | `/coupons`          | Create new coupon    | `useCreateCoupon()`   |
| `PUT`    | `/coupons/{id}`     | Update coupon        | `useUpdateCoupon()`   |
| `DELETE` | `/coupons/{id}`     | Delete coupon        | `useDeleteCoupon()`   |

### 📄 Invoices API

| Method | Endpoint                | Description           | Hook                       |
| ------ | ----------------------- | --------------------- | -------------------------- |
| `GET`  | `/invoices`             | List invoices         | `useInvoices()`            |
| `GET`  | `/invoices/{id}`        | Get single invoice    | `useInvoice()`             |
| `POST` | `/invoices`             | Create new invoice    | `useCreateInvoice()`       |
| `PUT`  | `/invoices/{id}/status` | Update invoice status | `useUpdateInvoiceStatus()` |

### 📝 Blog API

| Method   | Endpoint       | Description          | Hook                  |
| -------- | -------------- | -------------------- | --------------------- |
| `GET`    | `/blog`        | List blog posts      | `useBlogPosts()`      |
| `GET`    | `/blog/{slug}` | Get single blog post | `useBlogPost()`       |
| `POST`   | `/blog`        | Create new blog post | `useCreateBlogPost()` |
| `PUT`    | `/blog/{id}`   | Update blog post     | `useUpdateBlogPost()` |
| `DELETE` | `/blog/{id}`   | Delete blog post     | `useDeleteBlogPost()` |

### 🔍 Search API

| Method | Endpoint  | Description                 | Hook          |
| ------ | --------- | --------------------------- | ------------- |
| `GET`  | `/search` | Search products and content | `useSearch()` |

**Search Parameters:**

- `q`: Search query (required)
- `type`: Search type (products, all)
- `page`: Page number
- `limit`: Results per page
- `category`: Filter by category
- `min_price`: Minimum price
- `max_price`: Maximum price
- `sort_by`: Sort order

### 🔐 Authentication API

| Method | Endpoint                | Description            | Usage                  |
| ------ | ----------------------- | ---------------------- | ---------------------- |
| `POST` | `/auth/login`           | User login             | `api.login()`          |
| `POST` | `/auth/register`        | User registration      | `api.register()`       |
| `POST` | `/auth/logout`          | User logout            | `api.logout()`         |
| `POST` | `/auth/forgot-password` | Password reset request | `api.forgotPassword()` |
| `POST` | `/auth/reset-password`  | Password reset         | `api.resetPassword()`  |

### 📈 Analytics API

| Method | Endpoint               | Description          | Hook                  |
| ------ | ---------------------- | -------------------- | --------------------- |
| `GET`  | `/analytics/dashboard` | Dashboard statistics | `useDashboardStats()` |
| `GET`  | `/analytics/sales`     | Sales analytics      | `useSalesAnalytics()` |

### ⚙️ Settings API

| Method | Endpoint    | Description           | Hook                  |
| ------ | ----------- | --------------------- | --------------------- |
| `GET`  | `/settings` | Get store settings    | `useSettings()`       |
| `PUT`  | `/settings` | Update store settings | `useUpdateSettings()` |

### 📁 File Upload API

| Method | Endpoint  | Description  | Hook              |
| ------ | --------- | ------------ | ----------------- |
| `POST` | `/upload` | Upload files | `useFileUpload()` |

## 🎯 Integration Examples

### Frontend Pages Integration

#### 1. Dashboard Product List (`/dashboard/products`)

```typescript
const { data, isLoading, error } = useProducts({
  page: currentPage,
  limit: 10,
  search: searchQuery,
});
```

#### 2. Frontend Product Catalog (`/products`)

```typescript
const { data: products } = useProducts({
  page: currentPage,
  category: selectedCategory,
  search: searchQuery,
  sort_by: sortBy,
});
```

#### 3. Shopping Cart (`/cart`)

```typescript
const { data: cart } = useCart(sessionId);
const addToCart = useAddToCart();
const updateItem = useUpdateCartItem();
const removeItem = useRemoveFromCart();
```

#### 4. Wishlist (`/wishlist`)

```typescript
const { data: wishlist } = useWishlist(customerId);
const addToWishlist = useAddToWishlist();
const removeFromWishlist = useRemoveFromWishlist();
```

## 🔄 State Management

### React Query Configuration

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: (failureCount, error) => {
        if (error?.status === 404) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
  },
});
```

### Cache Invalidation Strategy

- **Products**: Invalidated on create/update/delete
- **Cart**: Invalidated on any cart modification
- **Wishlist**: Invalidated on add/remove
- **Orders**: Invalidated on status updates

## 🎨 UI Integration Patterns

### Loading States

```typescript
{isLoading && (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
    <span className="ml-2">Loading...</span>
  </div>
)}
```

### Error Handling

```typescript
{error && (
  <div className="text-center py-12">
    <p className="text-red-500">Failed to load data</p>
    <Button onClick={() => refetch()}>Retry</Button>
  </div>
)}
```

### Optimistic Updates

```typescript
const mutation = useMutation({
  mutationFn: api.updateProduct,
  onMutate: async (variables) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(["products"]);

    // Snapshot previous value
    const previousData = queryClient.getQueryData(["products"]);

    // Optimistically update
    queryClient.setQueryData(["products"], (old) => {
      // Update logic here
    });

    return { previousData };
  },
  onError: (err, variables, context) => {
    // Rollback on error
    queryClient.setQueryData(["products"], context.previousData);
  },
  onSettled: () => {
    // Refetch to ensure consistency
    queryClient.invalidateQueries(["products"]);
  },
});
```

## 📱 Session Management

### Local Storage Keys

- `session_id`: Anonymous cart session
- `customer_id`: Logged-in customer ID
- `auth_token`: Authentication token

### Session Initialization

```typescript
useEffect(() => {
  const sessionId = localStorage.getItem("session_id");
  if (!sessionId) {
    const newSessionId = Math.random().toString(36).substr(2, 9);
    localStorage.setItem("session_id", newSessionId);
  }
}, []);
```

## 🔔 Toast Notifications

### Success Messages

```typescript
const { mutate } = useAddToCart();

const handleAddToCart = () => {
  mutate(productData, {
    onSuccess: () => toast.success("Added to cart!"),
    onError: () => toast.error("Failed to add to cart"),
  });
};
```

## 🌐 Environment Configuration

### API Configuration

```typescript
// lib/api.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://goba-ecommerce.sunmedagency.com/api";
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://goba-ecommerce.sunmedagency.com/api
NEXT_PUBLIC_APP_URL=https://your-app-domain.com
```

## 🔧 Development Tools

### React Query Devtools

- **Development**: Enabled for debugging
- **Production**: Automatically disabled
- **Features**: Query inspection, cache management, refetch controls

### TypeScript Integration

- **Type Safety**: All API responses typed
- **Auto-completion**: Full IntelliSense support
- **Error Prevention**: Compile-time error checking

## 🚀 Performance Optimizations

### Query Optimization

- **Stale Time**: Different for different data types
- **Background Refetching**: Automatic data freshness
- **Selective Invalidation**: Only relevant queries updated

### Pagination

- **Server-side**: Reduces payload size
- **Infinite Scroll**: Available for product lists
- **Cache Efficiency**: Previous pages remain cached

### Image Optimization

- **Next.js Image**: Automatic optimization
- **Lazy Loading**: Images load on demand
- **WebP Support**: Modern format when available

## 📊 Monitoring & Analytics

### Error Tracking

- **API Errors**: Logged with context
- **User Actions**: Failed mutations tracked
- **Performance**: Query timing monitored

### Usage Analytics

- **Popular Products**: Track view/cart additions
- **Search Queries**: Monitor search patterns
- **Conversion Funnel**: Track cart to checkout

## 🔒 Security Considerations

### API Security

- **HTTPS Only**: All requests encrypted
- **CORS Configuration**: Proper origin restrictions
- **Rate Limiting**: Prevent abuse

### Client Security

- **XSS Prevention**: Proper data sanitization
- **CSRF Protection**: Token-based requests
- **Data Validation**: Client and server-side

## 📝 Testing Strategy

### API Testing

- **Unit Tests**: Individual API functions
- **Integration Tests**: Complete user flows
- **Mock Services**: Development environment

### React Query Testing

- **Query Tests**: Data fetching behavior
- **Mutation Tests**: Update operations
- **Cache Tests**: Invalidation logic

## 🎯 Future Enhancements

### Planned Features

- **Real-time Updates**: WebSocket integration
- **Offline Support**: Service worker caching
- **Advanced Search**: Elasticsearch integration
- **Recommendation Engine**: AI-powered suggestions

### Scalability Considerations

- **CDN Integration**: Static asset delivery
- **Database Optimization**: Query performance
- **Caching Strategy**: Redis implementation
- **Load Balancing**: Multiple server instances

## 📖 API Documentation

For complete and up-to-date API documentation, visit:
**https://goba-ecommerce.sunmedagency.com/api-docs**

This documentation includes:

- Complete endpoint specifications
- Request/response schemas
- Authentication requirements
- Rate limiting information
- Error code references
