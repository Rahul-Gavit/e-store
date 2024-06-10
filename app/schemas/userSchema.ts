import { object, string } from "zod";

export const userSchema = object({
  name: string().min(1), // Assuming name should be a non-empty string
  email: string().email(), // Assuming email should be a valid email address
  password: string().min(6), // Assuming password should be at least 6 characters long
  phoneNumber: string().nullable(), // Assuming phoneNumber should be a non-empty string
});
