import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ServiceDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();
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
            <h1 className="text-3xl font-bold">{service.name}</h1>
            <p className="mt-2 text-muted-foreground">{service.category}</p>

            <div className="mt-8 rounded-lg border p-6">
                <p>{service.description}</p>
                <div className="mt-6 space-y-2">
                    <p className="font-semibold">KSh {service.price}</p>
                    <p className="text-muted-foreground">Duration: {service.duration_minutes} minutes</p>
                </div>
            </div>

            <div className="mt-8">
                <Link
                    href={`/dashboard/services/${service.id}/book`}
                    className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    Book This Service
                </Link>
            </div>
        </div>
    );
}