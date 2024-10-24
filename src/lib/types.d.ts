interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: string
  image: string | null;
  status: string; 
  verificationCode: string | null;
  createdAt: string; 
  updatedAt: string; 
}