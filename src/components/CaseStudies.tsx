import React from 'react';
import { Clock, User, Calendar } from 'lucide-react';
import { CaseStudy } from '../types';

interface CaseStudiesProps {
  caseStudies: CaseStudy[];
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ caseStudies }) => {
  const recentCases = caseStudies.slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Case Studies</h2>
          <p className="text-xl text-gray-600">Real success stories from our patients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentCases.map((caseStudy) => (
            <div key={caseStudy.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              {caseStudy.image && (
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{caseStudy.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{caseStudy.description}</p>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Age: {caseStudy.patientAge} years</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Treatment: {caseStudy.treatmentDuration}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(caseStudy.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-emerald-800">
                    <strong>Outcome:</strong> {caseStudy.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recentCases.length === 0 && (
          <div className="text-center text-gray-500">
            <p>No case studies available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};