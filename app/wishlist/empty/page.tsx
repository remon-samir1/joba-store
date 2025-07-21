import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Empty Wishlist - Goba Store",
  description:
    "Your wishlist is empty. Browse our natural health products and add items to your wishlist.",
};

export default function EmptyWishlistPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-4xl font-semibold text-gray-900">Wishlist</h1>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20">
            {/* Illustration */}
            <div className="mb-16">
              <Image
                src="https://cdn.builder.io/api/v1/image/assets%2F02282edf997e416ea95b689ea249d822%2Fd790c3ecdc434c109ff3bd77628a7bee?format=webp&width=800"
                alt="Empty wishlist illustration"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>

            {/* Empty State Message */}
            <div className="text-center max-w-lg space-y-3">
              <h2 className="text-2xl font-medium text-gray-900 leading-relaxed">
                Ooops! your wishlist is empty!
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Suspendisse proin
                sagittis risus sed.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
