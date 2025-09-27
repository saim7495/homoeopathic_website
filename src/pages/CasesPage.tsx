import React, { useState } from 'react';
import { Search, Filter, User, Clock, Calendar, CheckCircle } from 'lucide-react';
import { CaseStudy } from '../types';

interface CasesPageProps {
  caseStudies: CaseStudy[];
}

export const CasesPage: React.FC<CasesPageProps> = ({ caseStudies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('');

  const uniqueConditions = [...new Set(caseStudies.map(cs => cs.condition))];

  const filteredCases = caseStudies.filter(caseStudy => {
    const matchesSearch = caseStudy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseStudy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseStudy.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterCondition || caseStudy.condition === filterCondition;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Studies</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Real success stories demonstrating the power of homeopathic healing
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search case studies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterCondition}
                onChange={(e) => setFilterCondition(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">All Conditions</option>
                {uniqueConditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCases.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No case studies found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((caseStudy) => (
                <div key={caseStudy.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  {caseStudy.image && (
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{caseStudy.title}</h3>
                      <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded">
                        {caseStudy.condition}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">{caseStudy.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-2" />
                        <span>Patient Age: {caseStudy.patientAge} years</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Treatment Duration: {caseStudy.treatmentDuration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(caseStudy.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Treatment Outcome:</p>
                          <p className="text-sm text-gray-600">{caseStudy.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Statistics */}
          <div className="mt-16 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Treatment Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-emerald-600">{caseStudies.length}</p>
                <p className="text-gray-600">Total Cases</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">{uniqueConditions.length}</p>
                <p className="text-gray-600">Conditions Treated</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">95%</p>
                <p className="text-gray-600">Success Rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-600">
                  {Math.round(caseStudies.reduce((sum, cs) => sum + cs.patientAge, 0) / caseStudies.length) || 0}
                </p>
                <p className="text-gray-600">Average Age</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};