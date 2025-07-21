"use client";

import { useState } from "react";
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Contact Form and FAQ Section */}
          <div className="bg-white rounded-[10px] p-10 shadow-sm mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              {/* Left Side - Contact Info */}
              <div className="bg-primary text-white p-10 rounded-[10px] relative overflow-hidden">
                {/* Background circles */}
                <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/20 rounded-full"></div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/20 rounded-full"></div>

                <div className="relative z-10">
                  <h2 className="text-3xl font-semibold mb-8">Contact us</h2>
                  <p className="text-white/90 mb-12 text-lg">
                    Lorem ipsum dolor sit amet consectetu!
                  </p>

                  {/* Contact Information */}
                  <div className="space-y-10">
                    <div className="flex items-center gap-6">
                      <Phone className="h-6 w-6 text-white" />
                      <span className="text-lg">+1012 3456 789</span>
                    </div>

                    <div className="flex items-center gap-6">
                      <Mail className="h-6 w-6 text-white" />
                      <span className="text-lg">joba@gmail.com</span>
                    </div>

                    <div className="flex items-start gap-6">
                      <MapPin className="h-6 w-6 text-white mt-1" />
                      <div className="text-lg leading-relaxed">
                        132 Dartmouth Street Boston,
                        <br />
                        Massachusetts 02156 United States
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex gap-4 mt-16">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Facebook className="h-4 w-4 text-primary" />
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Instagram className="h-4 w-4 text-primary" />
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Twitter className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - FAQ */}
              <div className="px-6">
                <h2 className="text-3xl font-semibold text-primary mb-8">
                  Discover FAQS From Our Support
                </h2>

                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem
                    value="item-1"
                    className="border-b border-gray-200"
                  >
                    <AccordionTrigger className="text-left text-2xl font-medium text-primary py-6 hover:no-underline">
                      How do i place an order?
                    </AccordionTrigger>
                    <AccordionContent className="text-xl text-gray-600 leading-relaxed pb-6">
                      Lorem ipsum dolor sit amet consectetur. Ac id orci nibh
                      condimentum feugiat massa dictum nunc.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="border-b border-gray-200"
                  >
                    <AccordionTrigger className="text-left text-2xl font-medium text-primary py-6 hover:no-underline">
                      Lorem ipsum dolor sit amet consectetur.
                    </AccordionTrigger>
                    <AccordionContent className="text-xl text-gray-600 leading-relaxed pb-6">
                      Lorem ipsum dolor sit amet consectetur. Ac id orci nibh
                      condimentum feugiat massa dictum nunc.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="border-b border-gray-200"
                  >
                    <AccordionTrigger className="text-left text-2xl font-medium text-primary py-6 hover:no-underline">
                      Lorem ipsum dolor sit amet consectetur.
                    </AccordionTrigger>
                    <AccordionContent className="text-xl text-gray-600 leading-relaxed pb-6">
                      Lorem ipsum dolor sit amet consectetur. Ac id orci nibh
                      condimentum feugiat massa dictum nunc.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 mb-8">
                Support team
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
                Lorem ipsum dolor sit amet consectetur. Vel scelerisque sed
                vivamus eu massa. Donec risus euismod sed curabitur. Tincidunt
                sed feugiat enim ornare a sed sed.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-14 border-primary/30 bg-background text-lg placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-14 border-primary/30 bg-background text-lg placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <Input
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="h-14 border-primary/30 bg-background text-lg placeholder:text-gray-400"
                />
              </div>

              {/* Message */}
              <div>
                <Textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="min-h-[150px] border-primary/30 bg-background text-lg placeholder:text-gray-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-lg"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
