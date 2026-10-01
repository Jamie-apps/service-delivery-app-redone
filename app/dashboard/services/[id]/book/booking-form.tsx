"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingInput, } from "@/lib/validations/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BookingFormProps {
    serviceId: string;
    providerId: string;
}

export default function BookingForm({
    serviceId,
    providerId,
}: BookingFormProps) {
    const form = useForm<BookingInput>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            serviceId,
            providerId,
            addressId: null,
            scheduledAt: "",
            notes: "",
        },
    });

    function onSubmit(data: BookingInput) {
        console.log("Booking submitted:", data);
    }

    return(
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 max-w-2xl space-y-6">
            <div className="space-y-2">
                <Label htmlFor="scheduledAt">Date and time</Label>
                <Input id="scheduledAt" type="datetime-local" {...form.register("scheduledAt")}/>
                {form.formState.errors.scheduledAt && (
                    <p className="text-sm text-destructive">{form.formState.errors.scheduledAt.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Anything the provider should know?" {...form.register("notes")}/>
                {form.formState.errors.notes && (
                    <p className="text-sm text-destructive">{form.formState.errors.notes.message}</p>
                )}
            </div>
            <Button type="submit">Continue</Button>
        </form> 
    );
}
