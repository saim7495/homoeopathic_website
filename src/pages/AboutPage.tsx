import React from 'react';
import { Award, GraduationCap, Users, Heart, Clock, MapPin, Phone, Mail } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Practice</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Dedicated to healing through the gentle, effective principles of homeopathy
          </p>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Dr. Rajesh Sharma"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Dr. Rajesh Sharma</h2>
              <p className="text-lg text-gray-600 mb-6">
                Dr. Rajesh Sharma is a renowned homeopathic physician with over 15 years of clinical experience. 
                He holds an M.D. in Homeopathic Medicine and has dedicated his career to providing compassionate, 
                effective treatment using classical homeopathic principles.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                His approach combines deep understanding of homeopathic materia medica with modern diagnostic 
                methods, ensuring comprehensive care for patients of all ages. Dr. Sharma specializes in 
                chronic diseases, mental health, and constitutional treatment.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-6 w-6 text-emerald-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Education</h4>
                    <p className="text-sm text-gray-600">M.D. Homeopathic Medicine</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Experience</h4>
                    <p className="text-sm text-gray-600">15+ Years Clinical Practice</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-emerald-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Patients Treated</h4>
                    <p className="text-sm text-gray-600">Over 10,000+ Patients</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-6 w-6 text-red-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Specialization</h4>
                    <p className="text-sm text-gray-600">Chronic & Constitutional Care</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Treatment Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow the fundamental principles of homeopathy established by Dr. Samuel Hahnemann
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Individualization</h3>
              <p className="text-gray-600">
                Every patient is unique. We treat the individual, not just the disease, 
                considering physical, mental, and emotional symptoms.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Holistic Healing</h3>
              <p className="text-gray-600">
                We address the root cause of illness, promoting natural healing processes 
                and restoring balance to the entire system.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gentle Treatment</h3>
              <p className="text-gray-600">
                Using minimum dose and potentized remedies, we stimulate the body's 
                natural healing ability without side effects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions We Treat */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Conditions We Treat</h2>
            <p className="text-xl text-gray-600">
              Comprehensive homeopathic care for a wide range of health conditions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Chronic Headaches & Migraines',
              'Digestive Disorders',
              'Respiratory Conditions',
              'Skin Problems',
              'Mental Health Issues',
              'Women\'s Health',
              'Pediatric Care',
              'Joint & Muscle Pain',
              'Autoimmune Conditions',
              'Sleep Disorders',
              'Hormonal Imbalances',
              'Allergies & Asthma'
            ].map((condition, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-emerald-50 transition-colors">
                <p className="font-medium text-gray-900">{condition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose HealWell Homeopathy</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Experienced Practitioner',
                description: '15+ years of clinical experience in classical homeopathy'
              },
              {
                icon: Heart,
                title: 'Patient-Centered Care',
                description: 'Compassionate approach with detailed case taking and follow-up'
              },
              {
                icon: Users,
                title: 'Proven Success Rate',
                description: '95% patient satisfaction with significant health improvements'
              },
              {
                icon: Clock,
                title: 'Flexible Consultation',
                description: 'In-person visits and online consultations available'
              },
              {
                icon: GraduationCap,
                title: 'Continuous Learning',
                description: 'Regular training and updates in latest homeopathic practices'
              },
              {
                icon: MapPin,
                title: 'Convenient Location',
                description: 'Easy access with ample parking and comfortable clinic environment'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};