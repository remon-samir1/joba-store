import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Users, 
  Award, 
  Headphones,
  Send
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Notifcation from "../../components/Notification";
import { toast } from "react-toastify";
import { Axios } from "../../components/Helpers/Axios";

const supportStats = [
  {
    icon: Clock,
    title: "Average Response Time",
    value: "< 2 hours",
    description: "We respond to most queries within 2 hours"
  },
  {
    icon: Users,
    title: "Support Team Size",
    value: "24/7",
    description: "Our team is available around the clock"
  },
  {
    icon: Award,
    title: "Customer Satisfaction",
    value: "98%",
    description: "Based on customer feedback surveys"
  },
  {
    icon: Headphones,
    title: "Issues Resolved",
    value: "99.5%",
    description: "First contact resolution rate"
  }
];

const supportChannels = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support agents",
    availability: "24/7 Available",
    responseTime: "< 1 minute",
    buttonText: "Start Chat",
    buttonVariant: "default"
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our support team",
    availability: "Mon-Fri 9AM-6PM",
    responseTime: "Immediate",
    buttonText: "Call Now",
    buttonVariant: "outline"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send detailed questions and get comprehensive answers",
    availability: "24/7 Available",
    responseTime: "< 2 hours",
    buttonText: "Send Email",
    buttonVariant: "outline"
  }
];

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Support Manager",
    speciality: "Product Specialist",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
    availability: "Online"
  },
  {
    name: "Ahmed Hassan",
    role: "Senior Support Agent",
    speciality: "Technical Issues",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    availability: "Online"
  },
  {
    name: "Maya Al-Rashid",
    role: "Customer Success",
    speciality: "Order & Shipping",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    availability: "Away"
  },
  {
    name: "Omar Farid",
    role: "Product Expert",
    speciality: "Natural Remedies",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    availability: "Online"
  }
];

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
const [loading , setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      Axios.post("contact", formData).then((data) => {
        console.log(data);
        setLoading(false)
        toast.success('Your message has been sent successfully.')
        setFormData({ name: "", email: "", message: ""  , subject:''});
      });
    } catch (err) {
      console.log(err);
      toast.error('Some Thing Wrong !')
      setLoading(false)

    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
<Notifcation/>
{loading && (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Sending your Message...</p>
        </div>
      )}
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Support Team
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Our dedicated support team is here to help you with any questions or concerns about our natural health products
          </p>
          
          {/* Quick Contact */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-5 w-5" />
              <span>+20 123 456 7890</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-5 w-5" />
              <span>support@gobastore.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Stats */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Support
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </h3>
                    <p className="font-semibold text-gray-900 mb-2">
                      {stat.title}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Get in Touch
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {channel.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {channel.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-center">
                        <Badge variant="outline" className="text-green-700 border-green-200">
                          {channel.availability}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Response time: {channel.responseTime}
                      </p>
                    </div>
                    
                    <Button 
                      variant={channel.buttonVariant}
                      className={channel.buttonVariant === "default" ? "bg-primary hover:bg-primary/90" : ""}
                    >
                      {channel.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </div>
          
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What can we help you with?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please describe your question or issue in detail..."
                  />
                </div>
                
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Support Team */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet Our Support Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover"
                    />
                    <div className={`absolute bottom-0 right-6 w-5 h-5 rounded-full border-2 border-white ${
                      member.availability === "Online" ? "bg-green-500" : "bg-gray-400"
                    }`} />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    Specializes in {member.speciality}
                  </p>
                  
                  <Badge 
                    variant={member.availability === "Online" ? "default" : "secondary"}
                    className={member.availability === "Online" ? "bg-green-100 text-green-700" : ""}
                  >
                    {member.availability}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
