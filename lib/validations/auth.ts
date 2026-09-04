import {z} from "zod";
export const signUpSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters.").max(100, "Name is too long"),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    phone: z.string().min(7, "Please enter a valid phone number.").max(20, "Phone number is too long."),
});
export const signInSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(1, "Password is required."),
});
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;