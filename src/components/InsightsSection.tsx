import React from 'react';
import { Star, Users, Award, Heart } from 'lucide-react';
import { Insight } from '../types';

interface InsightsSectionProps {
  insights: Insight[];
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ insights }) => {
  const defaultInsights: Insight[] = [
    {
      id: '1',
      title: 'Patient Rating',
      value: '4.9/5',
      icon: 'star',
      color: 'text-yellow-500'
    },
    {
      id: '2',
      title: 'Patients Cured',
      value: '1M+',
      icon: 'users',
      color: 'text-emerald-500'
    },
    {
      id: '3',
      title: 'Years Experience',
      value: '15+',
      icon: 'award',
      color: 'text-blue-500'
    },
    {
      id: '4',
      title: 'Success Rate',
      value: '95%',
      icon: 'heart',
      color: 'text-red-500'
    }
  ];

  const displayInsights = insights.length > 0 ? insights : defaultInsights;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'star': return <Star className="h-8 w-8" />;
      case 'users': return <Users className="h-8 w-8" />;
      case 'award': return <Award className="h-8 w-8" />;
      case 'heart': return <Heart className="h-8 w-8" />;
      default: return <Star className="h-8 w-8" />;
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayInsights.map((insight) => (
            <div key={insight.id} className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${insight.color}`}>
                {getIcon(insight.icon)}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{insight.value}</h3>
              <p className="text-gray-600">{insight.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};