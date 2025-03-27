import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import UserService from "@/services/UserService";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const Navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Email: ", email);

    try {
      const user = await UserService.signup(username, password, email);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        Navigate("/library");
      } else {
        console.log("Register failed");
        toast.error("Register failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Register failed");
    }
  };

  return (
    <>
      <form
        className={cn("flex flex-col gap-6", className)}
        {...props}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Register as a new user</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email, username and password below to register.
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </div>
        <div className="text-center text-sm">
          You already have an account?{" "}
          <a href="/login" className="underline underline-offset-4">
            Sign In
          </a>
        </div>
      </form>
      <Toaster />
    </>
  );
}
