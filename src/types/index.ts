export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  patientAge: number;
  condition: string;
  treatmentDuration: string;
  outcome: string;
  image?: string;
  createdAt: string;
}

export interface SliderImage {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  order: number;
}

export interface Insight {
  id: string;
  title: string;
  value: string;
  icon: string;
  color: string;
}

export interface Consultation {
  id: string;
  patientName: string;
  patientAge: number;
  patientPhone: string;
  patientEmail: string;
  chiefComplaint: string;
  paymentScreenshot?: string;
  isApproved: boolean;
  isPaid: boolean;
  createdAt: string;
  messages: Message[];
}

export interface Message {
  id: string;
  consultationId: string;
  sender: 'patient' | 'doctor';
  content: string;
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'doctor';
}