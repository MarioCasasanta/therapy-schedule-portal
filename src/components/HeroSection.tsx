
import { Calendar, Heart, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-sage-50 to-white">
      <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-5" />
      <div className="container mx-auto px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fadeIn [animation-delay:200ms]">
            <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-sage-600 bg-sage-100 rounded-full">
              Welcome to Tranquil Mind Therapy
            </span>
          </div>
          <h1 className="animate-fadeIn [animation-delay:400ms] text-4xl md:text-6xl font-playfair font-semibold text-accent mb-6">
            Begin Your Journey to Inner Peace
          </h1>
          <p className="animate-fadeIn [animation-delay:600ms] text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience transformative therapy sessions tailored to your unique needs. 
            Our expert therapists are here to guide you towards mental wellness and personal growth.
          </p>
          <div className="animate-fadeIn [animation-delay:800ms] flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-sage-500 text-white px-8 py-3 rounded-md hover:bg-sage-600 transition-all transform hover:-translate-y-1">
              Schedule a Session
            </button>
            <button className="border-2 border-sage-500 text-sage-600 px-8 py-3 rounded-md hover:bg-sage-50 transition-all transform hover:-translate-y-1">
              Learn More
            </button>
          </div>
          <div className="animate-fadeIn [animation-delay:1000ms] grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Calendar className="w-10 h-10 text-sage-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600 text-sm text-center">Choose times that work best for your schedule</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-sage-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Expert Therapists</h3>
              <p className="text-gray-600 text-sm text-center">Professional and caring therapeutic support</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Heart className="w-10 h-10 text-sage-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Personalized Care</h3>
              <p className="text-gray-600 text-sm text-center">Tailored approach to meet your unique needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
