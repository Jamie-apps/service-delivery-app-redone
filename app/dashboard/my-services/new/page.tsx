import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ServiceForm from "./service-form";

export default async function NewServicePage() {
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
    if (!profile || profile.role !== "provider") {
        redirect("/dashboard");
    }
    return (
        <div>
            <h1 className ="text-3x1 font-bold">Create Service</h1>
            <p className="mt-2 text-muted-foreground">Add a service thet customers can book.</p>
            <ServiceForm/>
        </div>
    );
}