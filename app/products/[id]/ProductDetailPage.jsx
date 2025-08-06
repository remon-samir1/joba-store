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
import Loading from "../../../components/Loading/Loading.jsx";
import SeoHelmet from "../../../src/components/SeoHelmet/SeoHelmet.jsx";
import { Axios } from "../../../components/Helpers/Axios.js";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");

  const [product, setProduct] = useState(null);

  useEffect(() => {
    Axios
      .get(`/products/${id}`)
      .then((res) => {
        const data = res.data.data
        console.log(data);
        if (data) {
          setProduct(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [id]);

  if (!product) return <Loading />;

  return (
    <div className="min-h-screen bg-background">
      <SeoHelmet
        title={product?.name.en}
        description={product?.description?.en}
      />
      <Header />

      <main className="py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-center gap-20  px-5  md:flex-row flex-col">
            <div className="flex-1">

            <ProductHero
              // reviews={product?.reviews}
              image={product?.image}
              additionalImages={product?.images}
              />
              </div>
<div className="flex-1">

            <ProductDetails
              inStock={product?.stock}
              name={product?.name?.en}
              productData={product}
              price={product?.price}
              rating={product?.rating}
              attachment_path={product?.attachment_path}
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
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 mt-11 gap-12 mb-16">
            <div className="lg:col-span-2">
              {/* {
                product?.stock > 0 &&
              <OrderForm sizeId={selectedSize} productId={id} />
              } */}
            </div>
            <div>{/* <CartTotals productId={id} sizeId={product} /> */}</div>
          </div>

          <div className="mb-16">
            <ReviewsSection slug={product?.slug} reviews={product?.reviews} />
          </div>

          <div className="mb-16">
            <RelatedProducts slug={product?.slug} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
