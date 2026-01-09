export interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

export interface ApiResponse {
  message?: string;
  error?: string;
  details?: string[];
  contact?: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}