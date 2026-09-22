import {redirect} from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage(){
    const supabase = await createClient();
    const { data: claims } = await supabase.auth.getClaims();
    if (!claims) {
        redirect("/login");
    }
    const userId = claims.claims.sub;
    const { data: profile, error } = await supabase
        .from ("profiles")
        .select ("full_name, role, phone")
        .eq("id", userId)
        .single();
    if (error || !profile){
        return (
            <main className="flex min-h-screen items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-2x1 font-bold">Profile not found</h1>
                    <p className="mt-2 text-muted-foreground">Your account exists, but your profile could not be loaded</p>
                </div>
            </main>
        );
    }
    return (
        <main className="min-h-screen p-6">
            <div className="mx-auto max-w-6x1">
                <h1 className="text-3x1 font-bold">Welcome, {profile.full_name}.</h1>
                <p className="mt-2 text-muted-foreground">You are signed in as a {profile.role}.</p>
                <div className="mt-8 rounded-lg border p-6">
                    <h2 className="text-x1 font-semibold">Your Profile</h2>
                    <div className="mt-4 space-y-2">
                        <p><strong>Name:</strong> {profile.full_name}</p>
                        <p><strong>Phone:</strong> {profile.phone}</p>
                        <p><strong>Role:</strong> {profile.role}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}