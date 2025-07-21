import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - Goba Store",
  description: "Read our latest articles about natural health and wellness.",
};

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "The Benefits of Natural Health Supplements",
    excerpt:
      "Discover how natural supplements can improve your overall health and wellness",
    author: "Dr. Sarah Johnson",
    date: "Dec 15, 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ab9739dd748e18cb32e34f0e0ee9be1a6b5adf13?width=794",
    slug: "benefits-natural-health-supplements",
  },
  {
    id: 2,
    title: "Essential Oils for Daily Wellness",
    excerpt: "Learn how to incorporate essential oils into your daily routine",
    author: "Maria Rodriguez",
    date: "Dec 12, 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/530126735eb9935a222ccdad870af49e50a60b9d?width=794",
    slug: "essential-oils-daily-wellness",
  },
  {
    id: 3,
    title: "Natural Remedies for Joint Pain",
    excerpt:
      "Effective natural solutions for managing joint pain and inflammation",
    author: "Dr. Michael Chen",
    date: "Dec 10, 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/32c3807e9cb359070eab9955b8d3424afce5a252?width=794",
    slug: "natural-remedies-joint-pain",
  },
  {
    id: 4,
    title: "The Power of Herbal Medicine",
    excerpt: "Understanding the traditional and modern uses of herbal medicine",
    author: "Dr. Emily Wilson",
    date: "Dec 8, 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/890ca25cb45abe82c6b7e208abff0926b69b0ef1?width=794",
    slug: "power-herbal-medicine",
  },
  {
    id: 5,
    title: "Nutrition and Natural Health",
    excerpt: "How proper nutrition supports your natural health journey",
    author: "Nutritionist Lisa Brown",
    date: "Dec 5, 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/23b15a9a79d7dc3d18ceb94301ccc2f1db8c3f54?width=794",
    slug: "nutrition-natural-health",
  },
  {
    id: 6,
    title: "Building a Natural Medicine Cabinet",
    excerpt: "Essential natural remedies every household should have",
    author: "Dr. James Thompson",
    date: "Dec 1, 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/882182d6d9cd3bec2bd5ebe5fefa879042565b0f?width=794",
    slug: "building-natural-medicine-cabinet",
  },
];

const recentPosts = [
  {
    id: 1,
    title: "Quick Tips for Natural Energy",
    author: "Dr. Sarah Johnson",
    date: "Dec 20, 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8a728cbffba3da461cc7d9e2368e9e97627f5387?width=260",
    slug: "quick-tips-natural-energy",
  },
  {
    id: 2,
    title: "Seasonal Wellness Guide",
    author: "Maria Rodriguez",
    date: "Dec 18, 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8a728cbffba3da461cc7d9e2368e9e97627f5387?width=260",
    slug: "seasonal-wellness-guide",
  },
  {
    id: 3,
    title: "Natural Sleep Solutions",
    author: "Dr. Michael Chen",
    date: "Dec 16, 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8a728cbffba3da461cc7d9e2368e9e97627f5387?width=260",
    slug: "natural-sleep-solutions",
  },
  {
    id: 4,
    title: "Immune System Boosters",
    author: "Dr. Emily Wilson",
    date: "Dec 14, 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8a728cbffba3da461cc7d9e2368e9e97627f5387?width=260",
    slug: "immune-system-boosters",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 bg-primary">
        <div className="absolute inset-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/eddfdc699d8281bb16d0aa99d53c775bc0bb8a30?width=2880"
            alt="Blog Hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <nav className="text-xl mb-4">
              <Link href="/" className="hover:text-gray-200">
                Home
              </Link>
              <span className="mx-2">&gt;</span>
              <span>Blog</span>
            </nav>
            <h1 className="text-6xl font-bold">Blog & Articles</h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Blog Posts */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-w-16 aspect-h-10">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">
                      By {post.author} • {post.date}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary font-semibold hover:text-primary/80 transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                3
              </button>
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Search */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Recent Posts</h3>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex gap-3">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block text-sm font-medium text-gray-900 hover:text-primary transition-colors line-clamp-2"
                      >
                        {post.title}
                      </Link>
                      <div className="text-xs text-gray-500 mt-1">
                        {post.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Categories</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/blog/category/supplements"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Natural Supplements (12)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/category/wellness"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Wellness Tips (8)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/category/nutrition"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Nutrition (6)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/category/herbal"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Herbal Medicine (5)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/category/lifestyle"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Healthy Lifestyle (4)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
