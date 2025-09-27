import React from 'react';
import { Stethoscope, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Stethoscope className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold">HealWell Homeopathy</span>
            </div>
            <p className="text-gray-300 mb-4">
              Dedicated to providing natural, effective homeopathic treatments for over 15 years. 
              Your health and well-being are our top priority.
            </p>
            <div className="flex space-x-3">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-300">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-300">info@healwell.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-1" />
                <span className="text-gray-300">
                  123 Wellness Street,<br />
                  Health City, HC 12345
                </span>
              </div>
            </div>
          </div>

          {/* Clinic Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Clinic Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="text-gray-300">Monday - Saturday</p>
                  <p className="text-sm text-gray-400">9:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="text-gray-300">Sunday</p>
                  <p className="text-sm text-gray-400">10:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-emerald-800 rounded-lg">
                <p className="text-sm text-emerald-100">
                  <strong>Online Consultation:</strong><br />
                  Daily 6:00 PM - 9:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Chronic Disease Treatment</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Acute Care</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Mental Health Support</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Women's Health</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Child Healthcare</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Online Consultation</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} HealWell Homeopathy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};