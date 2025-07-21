import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Search,
  Book,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Users,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center - Goba Store",
  description:
    "Find answers to frequently asked questions and get help with your order.",
};

const helpCategories = [
  {
    icon: ShoppingCart,
    title: "Orders & Shipping",
    description: "Track orders, shipping info, and delivery questions",
    articles: 12,
    href: "/help/orders",
  },
  {
    icon: Users,
    title: "Account & Profile",
    description: "Account settings, password, and profile management",
    articles: 8,
    href: "/help/account",
  },
  {
    icon: Shield,
    title: "Returns & Refunds",
    description: "Return policy, refunds, and exchange information",
    articles: 6,
    href: "/help/returns",
  },
  {
    icon: FileText,
    title: "Product Information",
    description: "Product details, ingredients, and usage instructions",
    articles: 15,
    href: "/help/products",
  },
  {
    icon: MessageCircle,
    title: "Payment & Billing",
    description: "Payment methods, billing issues, and invoices",
    articles: 7,
    href: "/help/payment",
  },
  {
    icon: Book,
    title: "General FAQ",
    description: "Common questions and general information",
    articles: 20,
    href: "/help/faq",
  },
];

const popularArticles = [
  {
    title: "How do I track my order?",
    description:
      "Learn how to check your order status and tracking information",
    href: "/help/track-order",
  },
  {
    title: "What is your return policy?",
    description: "Understand our return and refund policies",
    href: "/help/return-policy",
  },
  {
    title: "How do I create an account?",
    description: "Step-by-step guide to creating your Goba Store account",
    href: "/help/create-account",
  },
  {
    title: "Payment methods accepted",
    description: "Learn about the payment options available",
    href: "/help/payment-methods",
  },
  {
    title: "Product safety information",
    description: "Important safety information about our natural products",
    href: "/help/safety",
  },
  {
    title: "How to contact customer support",
    description: "Different ways to reach our customer support team",
    href: "/help/contact-support",
  },
];

function ShoppingCart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L19 19H7"
      />
    </svg>
  );
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            How can we help you?
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Find answers to your questions or get in touch with our support team
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center bg-white rounded-lg px-6 py-4 shadow-lg">
              <Search className="h-6 w-6 text-gray-400 mr-4" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="flex-1 text-lg outline-none text-gray-700"
              />
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Browse Help Topics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <category.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="text-sm text-primary font-medium">
                  {category.articles} articles
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Popular Help Articles
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <Link
                key={index}
                href={article.href}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600">{article.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still need help?
            </h2>
            <p className="text-xl text-gray-600">
              Can&apos;t find what you&apos;re looking for? Our support team is here to
              help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Live Chat */}
            <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Live Chat
              </h3>
              <p className="text-gray-600 mb-6">
                Chat with our support team in real-time
              </p>
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Start Chat
              </button>
            </div>

            {/* Email Support */}
            <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Email Support
              </h3>
              <p className="text-gray-600 mb-6">
                Send us an email and we&apos;ll respond within 24 hours
              </p>
              <Link
                href="/contact"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Send Email
              </Link>
            </div>

            {/* Phone Support */}
            <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Phone Support
              </h3>
              <p className="text-gray-600 mb-6">
                Call us Monday-Friday, 9AM-5PM PST
              </p>
              <a
                href="tel:+13866883295"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
