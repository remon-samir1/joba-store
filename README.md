# Goba E-commerce Store - Next.js

A modern e-commerce admin dashboard built with Next.js, TypeScript, and Tailwind CSS, designed to manage products, orders, customers, and more.

## 🚀 Features

### Dashboard Pages

- **Dashboard** (`/dashboard`) - Overview with analytics and charts
- **Product Management**
  - Product List (`/dashboard/products`) - View and manage all products
  - Add Product (`/dashboard/products/add`) - Create new products
  - Edit Product (`/dashboard/products/edit/[id]`) - Edit existing products
- **Order Management** (`/dashboard/orders`) - Manage customer orders
- **Customer Management** (`/dashboard/customers`) - View and manage customers
- **Categories** (`/dashboard/categories`) - Manage product categories
- **Coupons** (`/dashboard/coupons`) - Manage discount coupons
- **Invoices** (`/dashboard/invoices`) - View and manage invoices
- **Product Reviews** (`/dashboard/reviews`) - Moderate customer reviews
- **Popup Maker** (`/dashboard/popup-maker`) - Create marketing popups
- **Settings** (`/dashboard/settings`) - Configure store settings

### Frontend Pages

- **Home** (`/`) - Main store homepage
- **Products** (`/products`) - Product catalog
- **Product Details** (`/products/[id]`) - Individual product pages
- **Categories** (`/categories`) - Browse by category
- **Cart** (`/cart`) - Shopping cart
- **Wishlist** (`/wishlist`) - Customer wishlist
- **Search** (`/search`) - Product search
- **Profile** (`/profile`) - Customer profile
- **About** (`/about`) - About page
- **Contact** (`/contact`) - Contact information
- **Blog** (`/blog`) - Blog posts
- **Help** (`/help`) - Help documentation
- **Support** (`/support`) - Customer support

## 🛠 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: React hooks
- **API Integration**: Custom API service
- **Charts**: Recharts
- **Deployment**: Netlify

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd goba-store-nextjs
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXT_PUBLIC_API_URL=https://goba-ecommerce.sunmedagency.com/api
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔌 API Integration

The application integrates with the Goba E-commerce API. The main API service is located in `lib/api.ts`.

### API Endpoints

#### Products

- `GET /products` - List products with pagination and search
- `GET /products/{id}` - Get single product
- `POST /products` - Create new product
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

#### Categories

- `GET /categories` - List all categories
- `GET /categories/{id}` - Get single category
- `POST /categories` - Create new category
- `PUT /categories/{id}` - Update category
- `DELETE /categories/{id}` - Delete category

#### Orders

- `GET /orders` - List orders with pagination
- `GET /orders/{id}` - Get single order
- `PUT /orders/{id}/status` - Update order status

#### Customers

- `GET /customers` - List customers with pagination
- `GET /customers/{id}` - Get single customer

### API Usage Example

```typescript
import { api } from "@/lib/api";

// Get products
const products = await api.getProducts({
  page: 1,
  limit: 10,
  search: "search term",
});

// Create product
const newProduct = await api.createProduct({
  name: "Product Name",
  price: 99.99,
  stock_quantity: 100,
});
```

## 🎨 UI Components

The project uses a comprehensive set of reusable UI components:

- **Layout**: Cards, Separators, Containers
- **Navigation**: Sidebar, Tabs, Breadcrumbs
- **Forms**: Inputs, Textareas, Selects, Checkboxes, Switches
- **Data Display**: Tables, Badges, Progress bars
- **Feedback**: Toasts, Skeletons, Loading spinners
- **Overlays**: Modals, Dropdowns, Tooltips

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Netlify Deployment

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out` or `.next`
4. Add environment variables in Netlify dashboard
5. Deploy

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📊 Dashboard Features

### Product Management

- **Product List**: Paginated table with search, filters, and bulk actions
- **Add/Edit Products**: Comprehensive forms with image uploads, pricing, inventory
- **Categories**: Organize products into categories
- **Stock Management**: Track inventory levels and low stock alerts

### Order Management

- **Order List**: View all orders with status tracking
- **Order Details**: Complete order information
- **Status Updates**: Change order statuses (pending, processing, shipped, delivered)

### Analytics Dashboard

- **Sales Charts**: Visual representation of sales data
- **Product Performance**: Best-selling products and analytics
- **Customer Insights**: User engagement metrics
- **Revenue Tracking**: Financial overview and trends

### Settings

- **Store Configuration**: Basic store information
- **Payment Methods**: Configure payment options
- **Notifications**: Email and system notifications
- **Security**: Password and 2FA settings
- **Localization**: Language and currency settings

## 🔧 Development

### Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Admin dashboard pages
│   ├── products/         # Product pages
│   └── ...               # Other pages
├── components/           # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   └── ui/              # Generic UI components
├── lib/                 # Utility libraries
│   ├── api.ts          # API service
│   └── utils.ts        # Helper functions
└── public/             # Static assets
```

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Consistent naming conventions

### Adding New Pages

1. Create page component in appropriate `app/` directory
2. Add route to sidebar navigation if needed
3. Update API service if backend integration required
4. Add proper error handling and loading states

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check API URL in environment variables
   - Verify API server is running
   - Check network connectivity

2. **Build Errors**
   - Run `npm run typecheck` to check TypeScript errors
   - Ensure all dependencies are installed
   - Check for syntax errors in recent changes

3. **Missing Routes (404)**
   - All dashboard routes are now implemented
   - Check file naming in `app/` directory
   - Verify proper page.tsx files exist

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 API Documentation

For complete API documentation, visit: https://goba-ecommerce.sunmedagency.com/api-docs

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation
