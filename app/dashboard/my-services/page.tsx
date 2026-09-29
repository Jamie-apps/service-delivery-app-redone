import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function MyServicesPage() {
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

  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .eq("provider_id", userId)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            My Services
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage the services you offer.
          </p>
        </div>

        <a
          href="/dashboard/my-services/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Create Service
        </a>
      </div>

      {error ? (
        <p className="mt-8 text-destructive">
          Failed to load your services.
        </p>
      ) : services?.length === 0 ? (
        <div className="mt-8 rounded-lg border p-8 text-center">
          <h2 className="text-xl font-semibold">
            You haven't created any services yet.
          </h2>

          <p className="mt-2 text-muted-foreground">
            Create your first service to start offering it to customers.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services?.map((service) => (
            <div
              key={service.id}
              className="rounded-lg border p-6"
            >
              <h2 className="text-xl font-semibold">
                {service.name}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                {service.category}
              </p>

              <p className="mt-4 text-sm">
                {service.description}
              </p>

              <div className="mt-4 space-y-1">
                <p className="font-semibold">
                  KSh {service.price}
                </p>

                <p className="text-sm text-muted-foreground">
                  {service.duration_minutes} minutes
                </p>
              </div>

              <p className="mt-4 text-sm">
                {service.is_active ? "Active" : "Inactive"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}