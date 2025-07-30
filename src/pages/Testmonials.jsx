import { useState, useEffect, useRef } from 'react';
import { Axios } from '../../components/Helpers/Axios';
import StringSlice from '../../components/Helpers/StringSlice';

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const autoSlideInterval = useRef(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    Axios.get('/testimonials').then(data => {
      setTestimonials(data.data.data);
    });
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // توقيت التمرير التلقائي
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    autoSlideInterval.current = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(autoSlideInterval.current);
  }, [currentIndex, testimonials]);

  const getVisibleTestimonials = () => {
    if (testimonials.length === 0) return [];
    
    if (isMobile) {
      return [testimonials[currentIndex]];
    }
    
    const visible = [];
    const total = testimonials.length;
    
    // إضافة الشهادة السابقة
    visible.push(testimonials[(currentIndex - 1 + total) % total]);
    
    // إضافة الشهادة الحالية
    visible.push(testimonials[currentIndex]);
    
    // إضافة الشهادة التالية
    visible.push(testimonials[(currentIndex + 1) % total]);
    
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  const goToNext = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // مكون نجمة التقييم
  const Star = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
    </svg>
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* عنوان القسم */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Our Clients say
          </h2>
        </div>

        <div className="relative mb-8 sm:mb-12">
          <div 
            ref={sliderRef}
            className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6 sm:gap-8 transition-all duration-500`}
          >
            {visibleTestimonials.map((testimonial, index) => {
              // تحديد إذا كانت هذه الشهادة هي النشطة (المركزية في ديسكتوب)
              const isActive = isMobile || testimonial === testimonials[currentIndex];
              
              return (
                <div
                  key={testimonial.id || index}
                  className={`rounded-lg overflow-hidden transform transition-all duration-300 ${
                    isActive 
                      ? "bg-primary text-white scale-100" 
                      : "bg-white text-gray-600 scale-95 opacity-80"
                  }`}
                >
                  <div className="p-4 sm:p-6 lg:p-8 h-48 sm:h-56 lg:h-64 flex flex-col">
                    {/* النجوم */}
                    <div className="flex gap-1 mb-4 sm:mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            isActive
                              ? "fill-white text-white"
                              : "fill-gray-300 text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <h3
                      className={`text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 ${
                        isActive ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {testimonial.company}
                    </h3>

                    <p
                      className={`text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 flex-1 ${
                        isActive ? "text-gray-100" : "text-gray-600"
                      }`}
                    >
                      {StringSlice(testimonial.content , 120)}
                    </p>

                    {/* الاسم */}
                    <p
                      className={`font-semibold text-sm sm:text-base ${
                        isActive ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {testimonial.name} - {testimonial.position}
                    </p>
                  </div>

                  {/* الصورة */}
                  <div className="p-3 sm:p-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* أزرار التنقل */}
          <button
            onClick={goToPrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none transition-all"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none transition-all"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        {/* نقاط التنقل */}
        <div className="flex justify-center gap-3 sm:gap-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${
                index === currentIndex ? "bg-primary scale-125" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;