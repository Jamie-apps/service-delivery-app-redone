"use client";

import { createElement, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const {error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    setError(error.message);
    setLoading(false);
    return;
  }

  router.push("/dashboard");
}

  return createElement(
    "main",
    { className: "flex min-h-screen items-center justify-center px-6" },
    createElement(
      "div",
      { className: "w-full max-w-md space-y-8" },
      createElement(
        "div",
        { className: "space-y-2 text-center" },
        createElement("h1", { className: "text-3xl font-bold" }, "Welcome back"),
        createElement("p", { className: "text-muted-foreground" }, "Sign in to your account"),
      ),
      createElement(
        "form",
        { onSubmit: handleSubmit, className: "space-y-6" },
        createElement(
          "div",
          { className: "space-y-2" },
          createElement(Label, { htmlFor: "email" }, "Email"),
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
          { className: "space-y-2" },
          createElement(Label, { htmlFor: "password" }, "Password"),
          createElement(Input, {
            id: "password",
            type: "password",
            placeholder: "••••••••",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true,
          }),
          error
            ? createElement(
                "p",
                { className: "text-sm text-destructive" },
                error,
              )
            : null,
        ),
        createElement(
          Button,
          {
            type: "submit",
            className: "w-full",
            disabled: loading,
          },
          loading ? "Signing in..." : "Sign in",
        )
      ),
    ),
  );
}