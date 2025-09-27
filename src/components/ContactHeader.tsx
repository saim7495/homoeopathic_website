import React from 'react';
import { Phone, Mail } from 'lucide-react';

export const ContactHeader: React.FC = () => {
  return (
    <div className="bg-emerald-600 text-white py-2 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <Phone className="h-4 w-4" />
          <span>+91 9876543210</span>
        </div>
        <div className="flex items-center space-x-1">
          <Mail className="h-4 w-4" />
          <span>info@healwell.com</span>
        </div>
      </div>
    </div>
  );
};