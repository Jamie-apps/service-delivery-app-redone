import { ReactNode } from "react";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="min-h-screen">
            <aside className="fixed inset-y-0 left-0 w-64 border-r bg-muted/30 p-6">
                <h1 className="text-x1 fonr-bold">Service Delivery</h1>
                <nav className="mt-8 space-y-2">
                    <Link href="/dashboard" className="block rounded-md px-3 py-2 text text-sm hover:bg-muted">Dashboard</Link>
                    <Link href="/dashboard/services" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">Services</Link>
                    <Link href="/dashboard/my-services" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">My Services</Link>
                    <Link href="/dashboard/bookings" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">Bookings</Link>
                    <Link href="/dashboard/profile" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">Profile</Link>
                </nav>
            </aside>
            <main className="ml-64 min-h-screen p-8">
                {children}
            </main>
        </div>
    );
}