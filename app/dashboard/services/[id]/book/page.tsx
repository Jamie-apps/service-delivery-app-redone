import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BookingForm from "./booking-form";

export default async function BookServicePage({
    params,
}: {
    params: Promise<{id: string}>;
}) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: claims } = await supabase.auth.getClaims();
    if (!claims) {
        redirect("/login");
    }
    const userId = claims.claims.sub;
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();
    if (!profile || profile.role !== "customer") {
        redirect("/dashboard");
    }
    const { data: service, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .single();
    if (error || !service) {
        notFound();
    }
    return (
        <div className="max-w-3xl">
            <h1 className="text-3xl font-bold">Book {service.name}</h1>
            <p className="mt-2 text-muted-foreground">Schedule this service with the provider.</p>
            <div className="mt-8 rounded-lg border p-6">
                <p className="font-semibold">KSh {service.price}</p>
                <p className="mt-1 text-sm text-muted-foreground">Duration: {service.duration_minutes} minutes</p>
            </div>
            <BookingForm serviceId={service.id} providerId={service.provider_id}/>
        </div>
    );
}