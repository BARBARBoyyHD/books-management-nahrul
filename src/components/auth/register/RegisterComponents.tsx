"use client";

import { SpinnerLoading } from "@/components/spinner-loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/use-Auth"; // Import the updated hook
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Removed useTransition
import { toast } from "sonner";

export default function RegisterComponents() {
  // 1. Removed useTransition, as useRegister.isPending is sufficient

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  // 2. Updated useRegister call:
  // It no longer takes endpoint and queryKey arguments.
  // We pass the successful login callback directly.
  const loginMutation = useRegister(() => {
    // This runs on successful API/Action call
    toast("Login successful!", {
      style: { background: "#22c55e", color: "white" },
    });
    router.push("/login");
  });

  // Handles state update for controlled inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {

      await loginMutation.mutateAsync(registerForm);

    } catch (error) {
      console.error("Login attempt failed:", error);
    }
  }

  // 4. Use loginMutation.isPending for loading state
  const isLoading = loginMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm bg-white/5 border-none text-slate-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Admin Register
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            {/* EMAIL */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="text-slate-200"
                required
                value={registerForm.email}
                onChange={handleChange}
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="text-slate-200"
                required
                value={registerForm.password}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full font-medium cursor-pointer bg-white/20 hover:bg-white/10"
              // 5. Use the mutation's built-in loading state
              disabled={isLoading}
            >
              {isLoading ? <SpinnerLoading /> : "Submit"}
            </Button>
          </form>
          <Link href={"/login"} className="text-sm">
            Already have an account ? 
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
