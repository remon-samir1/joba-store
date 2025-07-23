import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { Footer } from "../../..//components/Footer.jsx";
import { ProductHero } from "../../../components/product/ProductHero.jsx";
import { ProductDetails } from "../../..//components/product/ProductDetails.jsx";
import { OrderForm } from "../../../components/product/OrderForm.jsx";
import { CartTotals } from "../../../components/product/CartTotals.jsx";
import { ReviewsSection } from "../../../components/product/ReviewsSection.jsx";
import { RelatedProducts } from "../../..//components/product/RelatedProducts";
import { Header } from "../../../src/components/Header.jsx";

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

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
<div className="flex items-start justify-between gap-3 md:flex-row flex-col md:!gap-24">

          <ProductHero
          
            // reviews={product?.reviews}
            image={product?.image}
            additionalImages={product?.images}
            />

            <ProductDetails
            inStock={product?.stock}
            
            name={product?.name?.en}
            price={product?.price}
            rating={product?.rating}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            slug={product?.slug}
            id={id}
            sizes={product?.sizes}
              description={product?.description?.en}
              category={product?.category.name}
              tags={product?.tags || []}
              />
              </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 mt-11 gap-12 mb-16">
            <div className="lg:col-span-2">
              <OrderForm  sizeId={selectedSize} productId={id}/>
            </div>
            <div>
              <CartTotals
                productId={id}
                sizeId={product}

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
