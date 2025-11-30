"use client";

import { SpinnerLoading } from "@/components/spinner-loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/use-Auth"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"; 
import { toast } from "sonner";

export default function LoginComponents() {
  
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const loginMutation = useLogin(() => {
    toast("Login successful!", {
      style: { background: "#22c55e", color: "white" },
    });
    router.push("/admin/books");
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync(loginForm);
    } catch (error) {
      console.error("Login attempt failed:", error);
    }
  }

  const isLoading = loginMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm bg-white/5 border-none text-slate-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Admin Login
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
                value={loginForm.email}
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
                value={loginForm.password}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full font-medium cursor-pointer bg-white/20 hover:bg-white/10"
              // 5. Use the mutation's built-in loading state
              disabled={isLoading}
            >
              {isLoading ? <SpinnerLoading /> : "Log in"}
            </Button>
          </form>
          <Link href={"/register"} className="text-sm">
           {"Don't have an account? Sign up"} 
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
