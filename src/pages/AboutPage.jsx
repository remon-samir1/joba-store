import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Star, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-white h-[405px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=2880"
            alt="About Hero Background"
            className="w-full h-full object-cover object-center"
            style={{ minHeight: "500px" }}
          />
        </div>

        {/* Breadcrumb and Title */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="flex flex-col gap-8">
            <nav className="text-lg md:text-2xl font-medium text-[#1D1919]">
              Home &gt; About
            </nav>
            <h1 className="text-4xl md:text-6xl font-bold text-[#1D1919]">
              About
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            {/* Left Image */}
            <div className="w-full lg:w-1/2 max-w-[503px]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb7ef968f136c3fed24c497b5a163ddd33bd5fb3?width=1006"
                alt="About Us"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-9">
              <div className="flex flex-col gap-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#1D1919] leading-[150%]">
                  Lorem ipsum dolor sit amet consectetur. Tortor faucibus leo
                  eget lorem.
                </h2>
                <p className="text-lg md:text-xl text-[#656565] leading-[160%]">
                  Lorem ipsum dolor sit amet consectetur. Ornare sodales varius
                  egestas malesuada placerat nunc consequat tincidunt id. At
                  arcu facilisis et aliquam eu sed. Odio eu nam dignissim
                  venenatis ornare cum risus. Et velit orci faucibus purus
                  dictum ac. Vel sed venenatis arcu porta purus est blandit.
                  Cursus cras erat lobortis vehicula aliquam ac hendrerit risus.
                  Sed in turpis lorem egestas.
                </p>
              </div>

              {/* Three small images */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/beb4382574e7e50d5f6a30882ab7742309d18026?width=454"
                  alt="Product 1"
                  className="w-full sm:w-1/3 h-32 sm:h-40 object-cover rounded-lg"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/66321575463c6e71b0d915b94e851b50f8ad5ceb?width=454"
                  alt="Product 2"
                  className="w-full sm:w-1/3 h-32 sm:h-40 object-cover rounded-lg"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d0eff5c0268ad8451be905d756ed12769b5912f?width=454"
                  alt="Product 3"
                  className="w-full sm:w-1/3 h-32 sm:h-40 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Section with Large Background and Overlay */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative min-h-[400px] lg:min-h-[538px]">
            {/* Large Background Image */}
            <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden mb-8 lg:mb-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/eddfdc699d8281bb16d0aa99d53c775bc0bb8a30?width=2480"
                alt="Featured Background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Orange Overlay Content */}
            <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-1/2 max-w-[639px] bg-[#DD7753] rounded-2xl p-6 lg:p-10">
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl lg:text-3xl font-medium text-white leading-[150%]">
                  Lorem ipsum dolor sit amet consectetur. Tortor faucibus leo
                  eget lorem.
                </h3>
                <p className="text-base lg:text-lg text-white leading-[160%]">
                  Lorem ipsum dolor sit amet consectetur. Ornare sodales varius
                  egestas malesuada placerat nunc consequat tincidunt id. At
                  arcu facilisis et aliquam eu sed
                </p>
              </div>
            </div>

            {/* Bottom Right Images */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 mt-8 lg:mt-0 lg:absolute lg:right-0 lg:bottom-0">
              <div className="w-full sm:w-48 lg:w-[308px] h-48 lg:h-[219px] rounded-xl border border-gray-200 bg-gray-300 overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b6428fb792f07dc0ec81d9486be3cd60998a97f?width=614"
                  alt="Product showcase"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full sm:w-48 lg:w-[308px] h-48 lg:h-[219px] rounded-xl border border-gray-200 overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c6519f21e5f9c4c874a8de82bb1b3542719423b?width=616"
                  alt="Product showcase"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            {/* Left side - Testimonial Card */}
            <div className="w-full max-w-[553px] bg-[#F5F6F8] rounded-lg p-6 flex flex-col min-h-[303px]">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gray-300 mb-8 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
                  alt="Andre Silva"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Review Text */}
              <div className="flex-1 mb-8">
                <p className="text-[#656565] text-base leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Adipiscing viverra
                  amet sed aliquet dolor velit imperdiet lectus eu. Diam diam a
                  in pellentesque ac risus quam turpis diam.
                </p>
              </div>

              {/* Name and Stars */}
              <div>
                <div className="text-[#1D1919] font-semibold text-base mb-4">
                  Andre Silva - Your Beloved Customer
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4
                          ? "fill-[#D9CA14] text-[#D9CA14]"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Slider dots */}
            <div className="flex lg:flex-col items-center gap-4 lg:gap-10">
              <div className="flex lg:flex-col gap-4 lg:gap-7">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-10 p-6 lg:p-10">
              <div className="flex flex-col gap-6">
                <div className="text-[#1D1919] text-base font-medium">
                  Newsletter
                </div>
                <div className="flex flex-col gap-6">
                  <h3 className="text-[#1D1919] text-2xl lg:text-3xl font-medium">
                    Signup & Get 10% Off
                  </h3>
                  <p className="text-[#656565] text-lg font-medium leading-[160%]">
                    Lorem ipsum dolor sit amet consectetur. Leo tellus est magna
                    dolor sit fermentum et. Purus commodo ornare maecenas
                    convallis.
                  </p>
                </div>
              </div>

              {/* Newsletter Form */}
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                <div className="flex-1 h-[55px] relative">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-full px-4 lg:px-7 bg-white border border-primary rounded text-base text-[#9A9AB0] placeholder-[#9A9AB0] focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button className="w-full sm:w-[109px] h-[55px] bg-[#DD7753] rounded flex items-center justify-center hover:bg-[#c66742] transition-colors">
                  <ArrowRight className="h-8 w-8 text-white" />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4bf57e943dabb06f6d588b0e9b015be6d5062834?width=1212"
                alt="Newsletter"
                className="w-full h-64 lg:h-[410px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
