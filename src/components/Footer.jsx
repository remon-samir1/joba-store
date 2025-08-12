import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Footer() {
  const {t , i18n} = useTranslation()
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6 sm:mb-8">
              <Link to="/">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/57cb790464154bff2bcbd91f5d2e6cafb61cc2bb?width=263"
                  alt="Goba Store Logo"
                  className="h-10 sm:h-12 w-auto brightness-0 invert"
                />
              </Link>
            </div>
            <p className="text-white/90 leading-relaxed text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur. Gravida dui tellus
              pharetra quisque erat in pulvinar. Quis pharetra tincidunt mauris
              habitasse massa nec habitant.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-base sm:text-lg font-bold mb-6 sm:mb-8">
              {t("Quick links")}
            </h3>
            <nav className="space-y-3 sm:space-y-4">
              <Link
                to="/"
                className="block text-white/90 hover:text-white transition-colors text-sm sm:text-base"
              >
                {t("Home")}
              </Link>
              <Link
                to="/about"
                className="block text-white/90 hover:text-white transition-colors text-sm sm:text-base"
              >
                {t("About us")}
              </Link>
              <Link
                to="/categories"
                className="block text-white/90 hover:text-white transition-colors text-sm sm:text-base"
              >
                {t("Categories")}
              </Link>
              <Link
                to="/blog"
                className="block text-white/90 hover:text-white transition-colors text-sm sm:text-base"
              >
                {t("Blog & articles")}
              </Link>
              <Link
                to="/contact"
                className="block text-white/90 hover:text-white transition-colors text-sm sm:text-base"
              >
                {t("Contact us")}
              </Link>
              <Link
                to="/support"
                className="block text-white/90 hover:text-white transition-colors text-sm sm:text-base"
              >
                {t("Support team")}
              </Link>
              <Link
                to="/help"
                className="block text-white/90 hover:text-white transition-colors text-sm sm:text-base"
              >
                {t("Help")}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-base sm:text-lg font-bold mb-6 sm:mb-8">
              {t("Get in Touch")}
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white mt-1 flex-shrink-0" />
                <div className="text-white/90 leading-relaxed text-sm sm:text-base">
                  8819 Ohio St. South Gate,
                  <br />
                  CA 90280
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white flex-shrink-0" />
                <div className="text-white/90 text-sm sm:text-base">
                  Ourstudio@hello.com
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white flex-shrink-0" />
                <div className="text-white/90 text-sm sm:text-base">
                  +1 386-688-3295
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-bold mb-6 sm:mb-8">
              {t("Join a Newsletter")}
            </h3>
            <div className="mb-6 sm:mb-8">
              <p className="text-white/90 mb-3 sm:mb-4 text-sm sm:text-base">
                {t("Your Email")}
              </p>
              <div className="flex flex-col gap-3 sm:gap-4">
                <input
                  type="email"
                  placeholder={`${t("Enter Your Email")}`}
                  className="bg-transparent border border-white rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                />
                <button className="bg-white text-primary px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors text-sm sm:text-base">
                  {t("Subscribe")}
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 sm:gap-4">
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 sm:pt-8 mt-12 sm:mt-16">
          <p className="text-white/90 text-center lg:text-left text-sm sm:text-base">
            @2020 Joba Ecommerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
