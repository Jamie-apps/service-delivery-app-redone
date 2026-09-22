import { createClient } from "@/lib/supabase/server";

export default async function ServicesPage() {
    const supabase = await createClient();
    const { data: services, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
    if (error) {
        return (
            <div>
                <h1 className="text-3x1 font-bold">Services</h1>
                <p className="mt-4 text-destructive">Failed to load services.</p>
            </div>
        );
    }
    return (
        <div>
            <h1 className="text-3x1 font-bold">Services</h1>
            <p className="mt-2 text-muted-foreground">Browse services from our providers.</p>
            {services.length === 0 ? (
                <div className="mt-8 rounded-lg border p-8 text-center">
                    <h2 className="text-xl font semibold">No services available.</h2>
                    <p className="mt-2 text-muted-foreground">There are currently no services available.</p>
                </div>
            ) : (
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div key={service.id} className="reounded-lg border p-6">
                            <h2 className="text-x1 font-semibold">{service.name}</h2>
                            <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                            <p className="mt-4 font-semibold">KSH {service.price}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{service.duration_minutes} minutes</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}