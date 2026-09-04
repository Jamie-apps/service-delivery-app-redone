import {NextResponse} from "next/server";
import {createClient} from "@/lib/supabase/server";
export async function GET(){
    try{
        const supabase = await createClient();
        // Creating the client successfully confirms the Supabase environment configuration is available.
        if (!supabase){
            throw new Error("Supabase client could not be created.");
        }
        return NextResponse.json({
            connected: true,
            message: "Supabase client configured successfully.",
        });
    } catch (error){
        return NextResponse.json(
            {
                connected: false,
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500}
        );
    }
}