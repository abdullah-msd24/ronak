export class SignupDto {
  name: string;
  email: string;
  password: string;
  bio?: string;
  age?: number;
  city?: string;
  interests?: string[];
}