import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Star, Users, Award, Heart } from 'lucide-react';
import { CaseStudy, SliderImage, Insight } from '../types';

interface AdminPanelProps {
  onClose: () => void;
  caseStudies: CaseStudy[];
  setCaseStudies: React.Dispatch<React.SetStateAction<CaseStudy[]>>;
  sliderImages: SliderImage[];
  setSliderImages: React.Dispatch<React.SetStateAction<SliderImage[]>>;
  insights: Insight[];
  setInsights: React.Dispatch<React.SetStateAction<Insight[]>>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onClose,
  caseStudies,
  setCaseStudies,
  sliderImages,
  setSliderImages,
  insights,
  setInsights
}) => {
  const [activeTab, setActiveTab] = useState<'cases' | 'slider' | 'insights'>('cases');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // New Case Study Form
  const [newCase, setNewCase] = useState({
    title: '',
    description: '',
    patientAge: '',
    condition: '',
    treatmentDuration: '',
    outcome: '',
    image: ''
  });

  // New Slider Image Form
  const [newSlider, setNewSlider] = useState({
    imageUrl: '',
    title: '',
    description: '',
    order: 1
  });

  // Edit Insights
  const [editingInsights, setEditingInsights] = useState<Insight[]>([]);

  useEffect(() => {
    if (insights.length === 0) {
      setEditingInsights([
        { id: '1', title: 'Patient Rating', value: '4.9/5', icon: 'star', color: 'text-yellow-500' },
        { id: '2', title: 'Patients Cured', value: '1M+', icon: 'users', color: 'text-emerald-500' },
        { id: '3', title: 'Years Experience', value: '15+', icon: 'award', color: 'text-blue-500' },
        { id: '4', title: 'Success Rate', value: '95%', icon: 'heart', color: 'text-red-500' }
      ]);
    } else {
      setEditingInsights([...insights]);
    }
  }, [insights, activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication for demo - in production, use proper auth
    if (loginForm.username === 'admin' && loginForm.password === 'healwell123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials. Use admin / healwell123');
    }
  };

  const addCaseStudy = (e: React.FormEvent) => {
    e.preventDefault();
    const caseStudy: CaseStudy = {
      id: Date.now().toString(),
      title: newCase.title,
      description: newCase.description,
      patientAge: parseInt(newCase.patientAge),
      condition: newCase.condition,
      treatmentDuration: newCase.treatmentDuration,
      outcome: newCase.outcome,
      image: newCase.image || undefined,
      createdAt: new Date().toISOString()
    };
    setCaseStudies(prev => [caseStudy, ...prev]);
    setNewCase({
      title: '',
      description: '',
      patientAge: '',
      condition: '',
      treatmentDuration: '',
      outcome: '',
      image: ''
    });
  };

  const deleteCaseStudy = (id: string) => {
    setCaseStudies(prev => prev.filter(cs => cs.id !== id));
  };

  const addSliderImage = (e: React.FormEvent) => {
    e.preventDefault();
    const slider: SliderImage = {
      id: Date.now().toString(),
      imageUrl: newSlider.imageUrl,
      title: newSlider.title,
      description: newSlider.description,
      order: newSlider.order
    };
    setSliderImages(prev => [...prev, slider].sort((a, b) => a.order - b.order));
    setNewSlider({
      imageUrl: '',
      title: '',
      description: '',
      order: sliderImages.length + 1
    });
  };

  const deleteSliderImage = (id: string) => {
    setSliderImages(prev => prev.filter(si => si.id !== id));
  };

  const saveInsights = () => {
    setInsights(editingInsights);
    alert('Insights updated successfully!');
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Login
            </button>
          </form>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p><strong>Demo Credentials:</strong></p>
            <p>Username: admin</p>
            <p>Password: healwell123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'cases', label: 'Case Studies' },
              { id: 'slider', label: 'Image Slider' },
              { id: 'insights', label: 'Insights' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
          {/* Case Studies Tab */}
          {activeTab === 'cases' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Manage Case Studies</h3>
              
              {/* Add New Case Form */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium mb-3">Add New Case Study</h4>
                <form onSubmit={addCaseStudy} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Case Title"
                    value={newCase.title}
                    onChange={(e) => setNewCase(prev => ({ ...prev, title: e.target.value }))}
                    className="border border-gray-300 rounded px-3 py-2"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Patient Age"
                    value={newCase.patientAge}
                    onChange={(e) => setNewCase(prev => ({ ...prev, patientAge: e.target.value }))}
                    className="border border-gray-300 rounded px-3 py-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Medical Condition"
                    value={newCase.condition}
                    onChange={(e) => setNewCase(prev => ({ ...prev, condition: e.target.value }))}
                    className="border border-gray-300 rounded px-3 py-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Treatment Duration"
                    value={newCase.treatmentDuration}
                    onChange={(e) => setNewCase(prev => ({ ...prev, treatmentDuration: e.target.value }))}
                    className="border border-gray-300 rounded px-3 py-2"
                    required
                  />
                  <input
                    type="url"
                    placeholder="Image URL (optional)"
                    value={newCase.image}
                    onChange={(e) => setNewCase(prev => ({ ...prev, image: e.target.value }))}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <div></div>
                  <textarea
                    placeholder="Case Description"
                    value={newCase.description}
                    onChange={(e) => setNewCase(prev => ({ ...prev, description: e.target.value }))}
                    className="border border-gray-300 rounded px-3 py-2 md:col-span-2"
                    rows={3}
                    required
                  />
                  <textarea
                    placeholder="Treatment Outcome"
                    value={newCase.outcome}
                    onChange={(e) => setNewCase(prev => ({ ...prev, outcome: e.target.value }))}
                    className="border border-gray-300 rounded px-3 py-2 md:col-span-2"
                    rows={2}
                    required
                  />
                  <button
                    type="submit"
                    className="md:col-span-2 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 inline mr-2" />
                    Add Case Study
                  </button>
                </form>
              </div>

              {/* Existing Cases */}
              <div className="space-y-4">
                {caseStudies.map((caseStudy) => (
                  <div key={caseStudy.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{caseStudy.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{caseStudy.description}</p>
                        <div className="mt-2 text-xs text-gray-500">
                          Age: {caseStudy.patientAge} | Duration: {caseStudy.treatmentDuration}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteCaseStudy(caseStudy.id)}
                        className="text-red-600 hover:text-red-800 ml-4"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Slider Tab */}
          {activeTab === 'slider' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Manage Image Slider</h3>
              
              {/* Add New Slider */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium mb-3">Add New Slide</h4>
                <form onSubmit={addSliderImage} className="space-y-4">
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={newSlider.imageUrl}
                    onChange={(e) => setNewSlider(prev => ({ ...prev, imageUrl: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Slide Title"
                    value={newSlider.title}
                    onChange={(e) => setNewSlider(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                  <textarea
                    placeholder="Slide Description"
                    value={newSlider.description}
                    onChange={(e) => setNewSlider(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows={2}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Display Order"
                    value={newSlider.order}
                    onChange={(e) => setNewSlider(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 inline mr-2" />
                    Add Slide
                  </button>
                </form>
              </div>

              {/* Existing Slides */}
              <div className="space-y-4">
                {sliderImages.map((slide) => (
                  <div key={slide.id} className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{slide.title}</h5>
                      <p className="text-sm text-gray-600">{slide.description}</p>
                      <p className="text-xs text-gray-500">Order: {slide.order}</p>
                    </div>
                    <button
                      onClick={() => deleteSliderImage(slide.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insights Tab */}
          {activeTab === 'insights' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Manage Insights</h3>
              
              <div className="space-y-4">
                {editingInsights.map((insight, index) => (
                  <div key={insight.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                          type="text"
                          value={insight.title}
                          onChange={(e) => {
                            const updated = [...editingInsights];
                            updated[index] = { ...updated[index], title: e.target.value };
                            setEditingInsights(updated);
                          }}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                        <input
                          type="text"
                          value={insight.value}
                          onChange={(e) => {
                            const updated = [...editingInsights];
                            updated[index] = { ...updated[index], value: e.target.value };
                            setEditingInsights(updated);
                          }}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                        <select
                          value={insight.icon}
                          onChange={(e) => {
                            const updated = [...editingInsights];
                            updated[index] = { ...updated[index], icon: e.target.value };
                            setEditingInsights(updated);
                          }}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                          <option value="star">Star</option>
                          <option value="users">Users</option>
                          <option value="award">Award</option>
                          <option value="heart">Heart</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={saveInsights}
                className="mt-6 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors"
              >
                <Save className="h-4 w-4 inline mr-2" />
                Save Insights
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};