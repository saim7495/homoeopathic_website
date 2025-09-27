import React, { useState, useEffect, useRef } from 'react';
import { Send, Clock, CreditCard, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Consultation, Message } from '../types';

interface ConsultationChatProps {
  onClose: () => void;
}

export const ConsultationChat: React.FC<ConsultationChatProps> = ({ onClose }) => {
  const [step, setStep] = useState<'check-timing' | 'patient-info' | 'payment' | 'waiting' | 'chat'>('check-timing');
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    chiefComplaint: ''
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const consultationHours = { start: 18, end: 21 }; // 6 PM to 9 PM

  useEffect(() => {
    const currentHour = new Date().getHours();
    const isConsultationTime = currentHour >= consultationHours.start && currentHour < consultationHours.end;
    
    if (!isConsultationTime) {
      setStep('check-timing');
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isConsultationTime = () => {
    const currentHour = new Date().getHours();
    return currentHour >= consultationHours.start && currentHour < consultationHours.end;
  };

  const handlePatientInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientInfo.name && patientInfo.age && patientInfo.phone && patientInfo.chiefComplaint) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentScreenshot) {
      // Create consultation record
      const newConsultation: Consultation = {
        id: Date.now().toString(),
        patientName: patientInfo.name,
        patientAge: parseInt(patientInfo.age),
        patientPhone: patientInfo.phone,
        patientEmail: patientInfo.email,
        chiefComplaint: patientInfo.chiefComplaint,
        paymentScreenshot,
        isApproved: false,
        isPaid: true,
        createdAt: new Date().toISOString(),
        messages: []
      };
      setConsultation(newConsultation);
      setStep('waiting');
      
      // Simulate doctor approval after 2 minutes for demo
      setTimeout(() => {
        setConsultation(prev => prev ? { ...prev, isApproved: true } : null);
        setStep('chat');
        setMessages([{
          id: '1',
          consultationId: newConsultation.id,
          sender: 'doctor',
          content: `Hello ${patientInfo.name}, I'm Dr. Sharma. I've reviewed your payment and information. How can I help you with your ${patientInfo.chiefComplaint} today?`,
          timestamp: new Date().toISOString()
        }]);
      }, 5000); // 5 seconds for demo, would be longer in real app
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && consultation) {
      const message: Message = {
        id: Date.now().toString(),
        consultationId: consultation.id,
        sender: 'patient',
        content: newMessage.trim(),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulate doctor response
      setTimeout(() => {
        const doctorResponse: Message = {
          id: (Date.now() + 1).toString(),
          consultationId: consultation.id,
          sender: 'doctor',
          content: "Thank you for sharing that. Based on your symptoms, I'd like to ask a few more questions to better understand your condition...",
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, doctorResponse]);
      }, 2000);
    }
  };

  const generateUPIQR = () => {
    // This would integrate with a real UPI QR generator in production
    return "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=doctor@healwell&pn=HealWell%20Homeopathy&am=200&cu=INR&tn=Consultation%20Fee";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Live Consultation</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 max-h-[calc(90vh-80px)] overflow-y-auto">
          {step === 'check-timing' && (
            <div className="text-center">
              <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Consultation Hours</h3>
              <p className="text-gray-600 mb-6">
                Online consultations are available daily from 6:00 PM to 9:00 PM.
              </p>
              {!isConsultationTime() ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-yellow-800">
                    We're currently offline. Please come back during consultation hours (6:00 PM - 9:00 PM).
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => setStep('patient-info')}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Start Consultation
                </button>
              )}
            </div>
          )}

          {step === 'patient-info' && (
            <form onSubmit={handlePatientInfoSubmit} className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Patient Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={patientInfo.name}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  value={patientInfo.age}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={patientInfo.phone}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={patientInfo.email}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chief Complaint *</label>
                <textarea
                  value={patientInfo.chiefComplaint}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, chiefComplaint: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={3}
                  placeholder="Please describe your main health concern..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Proceed to Payment
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="text-center">
              <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Consultation Fee</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-3xl font-bold text-emerald-600 mb-2">₹200</p>
                <p className="text-gray-600">One-time consultation fee</p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">Scan QR Code to Pay</h4>
                <div className="flex justify-center mb-4">
                  <img
                    src={generateUPIQR()}
                    alt="UPI QR Code"
                    className="w-48 h-48 border border-gray-300 rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  UPI ID: doctor@healwell<br />
                  Amount: ₹200
                </p>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Screenshot URL *
                  </label>
                  <input
                    type="url"
                    value={paymentScreenshot}
                    onChange={(e) => setPaymentScreenshot(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Paste screenshot URL here..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload your payment screenshot to any image hosting service and paste the URL
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Submit Payment Proof
                </button>
              </form>
            </div>
          )}

          {step === 'waiting' && (
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment Verification</h3>
              <p className="text-gray-600 mb-4">
                We're verifying your payment. The doctor will approve shortly and then the consultation will begin.
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
            </div>
          )}

          {step === 'chat' && (
            <div className="h-96 flex flex-col">
              <div className="bg-emerald-50 p-3 rounded-lg mb-4">
                <CheckCircle className="h-5 w-5 text-emerald-600 inline mr-2" />
                <span className="text-emerald-800 font-medium">Payment approved. You're now connected with Dr. Sharma.</span>
              </div>

              <div className="flex-1 border border-gray-300 rounded-lg p-4 overflow-y-auto mb-4">
                {messages.map((message) => (
                  <div key={message.id} className={`mb-4 ${message.sender === 'patient' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'patient' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'patient' ? 'text-emerald-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={sendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};