"use server";

import { createClient } from "@/lib/supabase/server";
import { serviceSchema, type ServiceInput, } from "@/lib/validations/service";
import { success } from "zod";

export async function createService(data: ServiceInput) {
    const validation = serviceSchema.safeParse(data);
    if (!validation.success) {
        return {
            success: false,
            error: validation.error.issues[0].message,
        };
    }
    const supabase = await createClient();
    const { data: claims } = await supabase.auth.getClaims();
    if (!claims) {
        return {
            success: false,
            error: "You must be logged in.",
        };
    }
    const userId = claims.claims.sub;
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();
    if (profileError || !profile || profile.role !== "provider") {
        return {
            success: false,
            error: "Only providers can create services."
        };
    }
    const { error: insertError } = await supabase
        .from("services")
        .insert({
            provider_id: userId,
            name: validation.data.name,
            description: validation.data.description || null,
            category: validation.data.category,
            price: validation.data.price,
            duration_minutes: validation.data.durationMinutes,
        });
    if (insertError) {
        console.error("Service creation failed:", insertError);
        return {
            success: false,
            error: "Failed to create service."
        };
    }
    return{
        success: true,
    };
}