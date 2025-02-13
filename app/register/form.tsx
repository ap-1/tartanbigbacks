"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect as nextRedirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    name: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;

interface RegisterFormProps {
    redirect: string | null;
}

export const RegisterForm = ({ redirect }: RegisterFormProps) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    const onSubmit = async ({ email, password, name }: FormValues) => {
        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
        });

        if (error) {
            toast.error(error.message);
        } else if (data) {
            toast.success("Registered successfully");
            nextRedirect(redirect ?? "/");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mb-2 w-80">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="mb-2 w-80">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="mb-8 w-80">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-80 mb-2">Sign up</Button>
            </form>
        </Form>
    );
};
