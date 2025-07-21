import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search, FileText, MessageCircle, Phone, Mail, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const faqData = [
  {
    category: "Orders & Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days."
      },
      {
        question: "Can I track my order?",
        answer: "Yes, you'll receive a tracking number via email once your order ships."
      },
      {
        question: "What are your shipping costs?",
        answer: "Free shipping on orders over EGP 300. Standard shipping is EGP 25."
      }
    ]
  },
  {
    category: "Products",
    items: [
      {
        question: "Are your products natural?",
        answer: "Yes, all our products are made from natural ingredients and are certified organic."
      },
      {
        question: "How do I use essential oils safely?",
        answer: "Always dilute essential oils before use. Consult our usage guide or contact support for specific advice."
      },
      {
        question: "Do you offer product samples?",
        answer: "Yes, we offer sample sizes for most of our essential oils and some supplements."
      }
    ]
  },
  {
    category: "Account & Payment",
    items: [
      {
        question: "How do I create an account?",
        answer: "Click the user icon in the header and select 'Sign Up' to create your account."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept credit cards, debit cards, PayPal, and bank transfers."
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page and follow the instructions sent to your email."
      }
    ]
  }
];

const helpCategories = [
  {
    title: "Getting Started",
    description: "Learn how to navigate our store and place your first order",
    icon: FileText,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Product Information",
    description: "Find detailed information about our natural products",
    icon: MessageCircle,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Order Support",
    description: "Track orders, returns, and shipping information",
    icon: Phone,
    color: "bg-orange-100 text-orange-600"
  },
  {
    title: "Account Help",
    description: "Manage your account, payments, and preferences",
    icon: Mail,
    color: "bg-purple-100 text-purple-600"
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter FAQ items based on search
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to your questions or get in touch with our support team
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-primary rounded-xl"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Browse Help Topics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      Learn More
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  {category.category}
                </h3>
                
                <div className="space-y-4">
                  {category.items.map((faq, faqIndex) => {
                    const globalIndex = `${categoryIndex}-${faqIndex}`;
                    return (
                      <Card key={faqIndex} className="overflow-hidden">
                        <CardHeader
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => toggleFaq(globalIndex)}
                        >
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg text-gray-900">
                              {faq.question}
                            </CardTitle>
                            <ChevronRight
                              className={`h-5 w-5 text-gray-400 transition-transform ${
                                expandedFaq === globalIndex ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </CardHeader>
                        
                        {expandedFaq === globalIndex && (
                          <CardContent className="pt-0">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Still need help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is here to assist you with any questions
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Live Chat
                </h3>
                <p className="text-gray-600 mb-4">
                  Get instant help from our support team
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Email Support
                </h3>
                <p className="text-gray-600 mb-4">
                  Send us a detailed message about your issue
                </p>
                <Button variant="outline">
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
