import {z} from "zod";
export const serviceSchema = z.object({
    name: z.string().min(2, "Service name must be at least 2 characters").max(100, "Service name is too long"),
    description: z.string().max(1000, "Description is too long").optional(),
    category: z.string().min(2, "Category is required.").max(50, "Category is too long."),
    price: z.number().min(0, "Price cannot be negative."),
    durationMinutes: z.number().int("Duration must be greater than 0.").optional(),
});
export type ServiceInput = z.infer<typeof serviceSchema>;