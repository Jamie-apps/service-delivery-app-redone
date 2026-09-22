import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function MyServicesPage(){
    const supabase = await createClient();
    const { data: claims } = await supabase.auth.getClaims();
    if (!claims) {
        redirect("/login");
    }
    const userId = claims.claims.sub;
    const { data:profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();
    if (!profile || profile.role !== "provider") {
        redirect("/dashboard");
    }
    return (
        <div>
            <h1 className="text-3x1 font-bold">My services</h1>
            <p className="mt-2 text-muted-foreground">Manage the services you offer.</p>
            <a href="/dashboard/my-services/new" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Create Service</a>
        </div>
    );
}