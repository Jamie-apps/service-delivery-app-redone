import {z} from "zod";
export const bookingSchema = z.object({
    serviceId: z.string().uuid("Invalid service."),
    providerId: z.string().uuid("Invalid provider."),
    addressId: z.string().uuid("Invalid address.").nullable(),
    scheduledAt: z.string().datetime("Invalid date and time."),
    notes: z.string().max(1000, "Notes are too long.").optional(),
});
export type BookingInput = z.infer<typeof bookingSchema>