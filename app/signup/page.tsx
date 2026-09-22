"use client";

import { createElement, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client";
import { signUpSchema } from "@/lib/validations/auth";

export default function SignupPage() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        setError("");
        setLoading(true);
        const result = signUpSchema.safeParse({
            fullName,
            email,
            password,
            phone,
        });
        if (!result.success) {
            setError(result.error.issues[0].message);
            setLoading(false);
            return;
        }
        const supabase = createClient();
        const { data, error: signupError } = await supabase.auth.signUp({
            email: result.data.email,
            password: result.data.password,
            options: {
                data: {
                    full_name: result.data.fullName,
                    phone: result.data.phone
                },
            },
        });
        console.log("signup response:", data);
        console.log("user metadata:", data.user?.user_metadata);
        console.log("signup error:", signupError);
        if (signupError){
            setError(signupError.message);
            setLoading(false);
            return;
        }
        console.log("Account created successfully");
        setLoading(false);
        router.push("/dashboard");
    }

    return createElement(
        "main",
        { className: "flex min-h-screen items-center justify-center px-6 py-12"},
        createElement(
            "div",
            { className: "w-full max-w-md space-y-8" },
            createElement(
                "div",
                { className: "text-y-2 text-center"},
                createElement(
                    "h1",
                    { className: "text-3x1 font-bold"},
                    "Create an account",
                ),
                createElement(
                    "p",
                    { className: "text-muted-foreground"},
                    "Create your customer account",
                ),
            ),

            createElement(
                "form",
                { onSubmit: handleSubmit, className: "space-y-6"},
                createElement(
                    "div",
                    { className: "space-y-2"},
                    createElement(Label, {htmlFor: "fullName"}, "Full Name"),
                    createElement(Input, {
                        id: "fullname",
                        type: "text",
                        placeholder: "Your full name",
                        value: fullName,
                        onChange: (e) => setFullName(e.target.value),
                        required: true,
                    }),
                ),
                createElement(
                    "div",
                    { className: "space-y-2"},
                    createElement(Label, { htmlFor: "email"}, "Email"),
                    createElement(Input, {
                        id: "email",
                        type: "email",
                        placeholder: "you@example.com",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        required: true,
                    }),
                ),
                createElement(
                    "div",
                    { className: "space-y-2"},
                    createElement(Label, {htmlFor: "phone"}, "Phone number"),
                    createElement(Input, {
                        id: "phone",
                        type: "tel",
                        placeholder: "0712345678",
                        value: phone,
                        onChange: (e) => setPhone(e.target.value),
                        required: true,
                    }),
                ),
                createElement(
                    "div",
                    { className: "space-y-2"},
                    createElement(Label, {htmlFor: "password"}, "Password"),
                    createElement(Input, {
                        id: "password",
                        type: "password",
                        placeholder: "••••••••",
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        required: true,
                    }),
                ),
                error
                    ? createElement(
                        "p",
                        { className: "text-sm text-destructive"},
                        error,
                    )
                    : null,
                createElement(
                    Button,
                    {
                        type: "submit",
                        className: "w-full",
                        disabled: loading,
                    },
                    loading ? "Creating account..." : "Create account",
                ),
            ),
        ),
    );
}