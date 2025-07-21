import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { Header } from "../../..//components/Header.jsx";
import { Footer } from "../../..//components/Footer.jsx";
import { ProductHero } from "../../../components/product/ProductHero.jsx";
import { ProductDetails } from "../../..//components/product/ProductDetails.jsx";
import { OrderForm } from "../../../components/product/OrderForm.jsx";
import { CartTotals } from "../../../components/product/CartTotals.jsx";
import { ReviewsSection } from "../../../components/product/ReviewsSection.jsx";
import { RelatedProducts } from "../../..//components/product/RelatedProducts";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get("https://goba-ecommerce.sunmedagency.com/api/products")
      .then((res) => {
        const data = res.data.data.filter((p) => p.id == id)[0];
        console.log(data);
        if (data) {
          setProduct(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [id]);

  if (!product) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="relative">
        <div
          className="h-96 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=1440')",
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
                <span>{">"}</span>
                <Link to="/categories" className="hover:text-primary">
                  Categories
                </Link>
                <span>{">"}</span>
                <span>{product?.category.name || "Product"}</span>
                <span>{">"}</span>
                <span>{product?.name.en}</span>
              </div>
            </nav>

            <h1 className="text-6xl font-semibold text-gray-900">
              {product?.name.en}
            </h1>
          </div>
        </div>
      </div>

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ProductHero
            name={product?.name?.en}
            price={product?.price}
            rating={product?.rating}
            // reviews={product?.reviews}
            image={product?.image}
            additionalImages={product?.images}
            inStock={product?.stock}
          />

          <div className="mb-12">
            <ProductDetails
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            slug={product?.slug}
            id={id}
            sizes={product?.sizes}
              description={product?.description?.en}
              category={product?.category.name}
              tags={product?.tags || []}
              price={product?.price}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <OrderForm  sizeId={selectedSize} productId={id}/>
            </div>
            <div>
              <CartTotals
                productId={id}
                sizeId={product}

                subtotal={product?.price * 3}
                shipping="Free Shipping"
                total={product?.price * 3}
              />
            </div>
          </div>

          <div className="mb-16">
            <ReviewsSection slug={product?.slug}
            reviews={product?.reviews}
            
            />
          </div>

          <div className="mb-16">
            <RelatedProducts slug={product?.slug}/>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
