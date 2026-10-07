import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        { email, password },
      );

      if (res.status === 200) {
        Cookies.set("userName", res.data.user.name);
        Cookies.set("userEmail", res.data.user.email);

        navigate("/", { replace: true });
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center p-3 w-full",
        className,
      )}
      {...props}
    >
      <Card className="w-full max-w-sm sm:max-w-md shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12),0_0_1px_1px_rgba(255,255,255,0.9)] bg-white/85 border border-slate-200/80 backdrop-blur-2xl rounded-3xl text-slate-900 p-4 sm:p-6 transition-all duration-300">
        <CardHeader className="space-y-3 text-center pb-5">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-sky-50 border border-sky-100 text-sky-600 shadow-xs">
              <span className="size-1.5 rounded-full bg-sky-500 animate-pulse" />
              WPCS OF AKBL 2026
            </span>
          </div>

          <CardTitle className="text-2xl font-black tracking-tight text-slate-900">
            Welcome back
          </CardTitle>

          <CardDescription className="text-xs font-medium text-slate-500">
            Sign in to access your workplace survey analytics
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup className="space-y-4">
              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50/90 px-4 py-3 text-xs text-rose-600 shadow-xs font-medium">
                  {error}
                </div>
              )}

              <Field className="space-y-1.5">
                <FieldLabel htmlFor="email" className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Email Address
                </FieldLabel>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />

                  <Input
                    id="email"
                    type="email"
                    placeholder="name@iriscommunications.com.pk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="pl-10 h-11 bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-xl focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 text-sm transition-all shadow-xs"
                    required
                  />
                </div>
              </Field>

              <Field className="space-y-1.5">
                <FieldLabel htmlFor="password" className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Password
                </FieldLabel>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />

                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="pl-10 h-11 bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-xl focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 text-sm transition-all shadow-xs"
                    required
                  />
                </div>
              </Field>

              <Field className="space-y-3 pt-2">
                <Button
                  type="submit"
                  className="w-full h-11 font-bold text-sm bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/35 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}

                  {isLoading ? "Signing in..." : "Sign in to Dashboard"}
                </Button>

                <p className="text-center text-[11px] text-slate-400 pt-1 font-medium">
                  Askari Bank Limited • Confidential & Secure
                </p>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
