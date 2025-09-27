import React from 'react';
import { ImageSlider } from '../components/ImageSlider';
import { InsightsSection } from '../components/InsightsSection';
import { CaseStudies } from '../components/CaseStudies';
import { SliderImage, CaseStudy, Insight } from '../types';
import { Stethoscope, Heart, Award, Users } from 'lucide-react';

interface HomePageProps {
  sliderImages: SliderImage[];
  caseStudies: CaseStudy[];
  insights: Insight[];
}

export const HomePage: React.FC<HomePageProps> = ({ sliderImages, caseStudies, insights }) => {
  return (
    <div>
      {/* Image Slider */}
      <ImageSlider slides={sliderImages} />

      {/* Insights Section */}
      <InsightsSection insights={insights} />

      {/* Case Studies */}
      <CaseStudies caseStudies={caseStudies} />

      {/* Short About Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About HealWell Homeopathy
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 15 years of dedicated practice, Dr. Sharma has been transforming lives through 
                the gentle yet powerful approach of homeopathy. Our clinic combines traditional wisdom 
                with modern understanding to provide personalized treatment for each patient.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe in treating the root cause, not just the symptoms, ensuring lasting health 
                and well-being for all our patients. Every treatment plan is carefully crafted to match 
                your unique constitution and health needs.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Stethoscope className="h-8 w-8 text-emerald-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Personalized Care</h4>
                    <p className="text-sm text-gray-600">Tailored treatments for individual needs</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-8 w-8 text-red-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Holistic Approach</h4>
                    <p className="text-sm text-gray-600">Mind, body, and spirit healing</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-blue-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Expert Care</h4>
                    <p className="text-sm text-gray-600">15+ years of clinical experience</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-emerald-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Proven Results</h4>
                    <p className="text-sm text-gray-600">Thousands of satisfied patients</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Dr. Sharma"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dr. Rajesh Sharma</p>
                    <p className="text-sm text-gray-600">Chief Homeopath</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};