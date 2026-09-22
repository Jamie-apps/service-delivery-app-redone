"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, type ServiceInput, } from "@/lib/validations/service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ServiceForm(){
    const form = useForm<ServiceInput>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            price: 0,
            durationMinutes: 60,
        },
    });

    function onSubmit(data: ServiceInput){
        console.log("Service form submitted:", data);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 max-w-2xl space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Service name</Label>
                <Input id="name" placeholder="e.g. House Cleaning" {...form.register("name")}/>
                {form.formState.errors.name && (
                    <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="e.g. Cleaning" {...form.register("category")}/>
                {form.formState.errors.category && (
                    <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the service..." {...form.register("description")}/>
                {form.formState.errors.description && (
                    <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="price">Price (KSH)</Label>
                <Input id="price" type="number" min="0" step="0.01" {...form.register("price", {
                    valueAsNumber: true,
                })}
                />
                {form.formState.errors.price && (
                    <p className="text-sm text-destructive">{form.formState.errors.price.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="durationMinutes">Duration (minutes)</Label>
                <Input id="durationMinutes" type="number" min="1" {...form.register("durationMinutes", {
                    valueAsNumber: true,
                })}
                />
                {form.formState.errors.durationMinutes && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.durationMinutes.message}
                    </p>
                )}
            </div>
            <Button type="submit">Create Service</Button>
        </form>
    )
}