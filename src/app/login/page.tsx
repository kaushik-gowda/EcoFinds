
import LoginForm from "@/components/auth/login-form";
import { Leaf } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-sm">
        <div className="flex flex-col items-center text-center mb-8">
            <Link href="/" className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold font-headline">EcoFinds</span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your EcoFinds account.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
