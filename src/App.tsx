import React, { useState } from 'react';
import { ContactHeader } from './components/ContactHeader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CasesPage } from './pages/CasesPage';
import { ContactPage } from './pages/ContactPage';
import { ConsultationChat } from './components/ConsultationChat';
import { AdminPanel } from './components/AdminPanel';
import { CaseStudy, SliderImage, Insight } from './types';
import { Settings } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showConsultation, setShowConsultation] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // State for dynamic content
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([
    {
      id: '1',
      title: 'Chronic Migraine Recovery',
      description: 'A 35-year-old software engineer suffering from severe migraines for 8 years found complete relief through constitutional homeopathic treatment.',
      patientAge: 35,
      condition: 'Chronic Migraine',
      treatmentDuration: '6 months',
      outcome: 'Complete elimination of migraines with improved energy levels and better sleep patterns.',
      image: 'https://images.pexels.com/photos/3767411/pexels-photo-3767411.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Anxiety and Depression Treatment',
      description: 'Young mother overcame postpartum depression and anxiety through gentle homeopathic remedies and supportive care.',
      patientAge: 28,
      condition: 'Anxiety & Depression',
      treatmentDuration: '4 months',
      outcome: 'Significant improvement in mood, reduced anxiety attacks, and restored quality of life.',
      image: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: 'Eczema Healing Success',
      description: 'A 12-year-old child with severe atopic eczema experienced remarkable improvement in skin condition.',
      patientAge: 12,
      condition: 'Atopic Eczema',
      treatmentDuration: '8 months',
      outcome: 'Clear skin with occasional mild flare-ups, eliminated steroid dependency.',
      image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: '2024-01-05'
    }
  ]);

  const [sliderImages, setSliderImages] = useState<SliderImage[]>([
    {
      id: '1',
      imageUrl: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Welcome to HealWell Homeopathy',
      description: 'Natural healing through personalized homeopathic treatment',
      order: 1
    },
    {
      id: '2',
      imageUrl: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Experienced & Compassionate Care',
      description: '15+ years of dedicated service to health and wellness',
      order: 2
    }
  ]);

  const [insights, setInsights] = useState<Insight[]>([]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage sliderImages={sliderImages} caseStudies={caseStudies} insights={insights} />;
      case 'about':
        return <AboutPage />;
      case 'cases':
        return <CasesPage caseStudies={caseStudies} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage sliderImages={sliderImages} caseStudies={caseStudies} insights={insights} />;
    }
  };

  const handleNavigation = (page: string) => {
    if (page === 'consultation') {
      setShowConsultation(true);
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <ContactHeader />
      <Navbar currentPage={currentPage} onNavigate={handleNavigation} />
      
      <main>
        {renderCurrentPage()}
      </main>

      <Footer />

      {/* Admin Button */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-40"
        title="Admin Panel"
      >
        <Settings className="h-6 w-6" />
      </button>

      {/* Consultation Chat Modal */}
      {showConsultation && (
        <ConsultationChat onClose={() => setShowConsultation(false)} />
      )}

      {/* Admin Panel Modal */}
      {showAdmin && (
        <AdminPanel
          onClose={() => setShowAdmin(false)}
          caseStudies={caseStudies}
          setCaseStudies={setCaseStudies}
          sliderImages={sliderImages}
          setSliderImages={setSliderImages}
          insights={insights}
          setInsights={setInsights}
        />
      )}
    </div>
  );
}

export default App;