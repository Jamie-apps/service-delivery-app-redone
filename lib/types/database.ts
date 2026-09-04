export type UserRole = "customer" | "provider" | "admin";
export type BookingStatus = | "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
export interface Profile {
    id: string;
    full_name: string | null;
    phone: string | null;
    role: UserRole;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}
export interface Service {
    id: string;
    provider_id: string;
    name: string;
    description: string | null;
    category: string;
    price: number;
    duration_munites: number | null,
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
export interface Address {
    id: string;
    user_id: string;
    label:string;
    address_line: string;
    city: string;
    additional_details: string | null;
    created_at: string; 
}
export interface Booking {
    id: string;
    customer_id: string;
    provider_id: string;
    service_id: string;
    address_id: string | null;
    scheduled_at: string;
    status: BookingStatus;
    service_price: number;
    notes: string | null;
    created_at: string;
    updated_at: string;
}
export interface Review {
    id: string;
    booking_id: string;
    customer_id: string;
    provider_id: string;
    rating: number;
    comment: string | null;
    created_at: string;
}