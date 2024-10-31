interface User {
  id: number;
  name: string;
  surname: string;
  phone: string;
  role: string
  image: string | null;
  status: string; 
  verificationCode?: string;
  createdAt?: string; 
  updatedAt?: string; 
}