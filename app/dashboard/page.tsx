import {redirect} from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage(){
    const supabase = await createClient();
    const {data: claims} = await supabase.auth.getClaims();
    if (!claims) {
        redirect("/login");
    }
    return (
        <main className = "flex min-h-screen items-center justify-center px-6">
            <div className = "text-center">
                <h1 className = "text-3x1 font-bold">Dashboard</h1>
                <p className = "mt-2 text-muted-foreground">
                    You are successfully authenticated.
                </p>
            </div>
        </main>
    );
}