"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { userPool, getUserPool } from "@/cognitoConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Mail, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: formData.email,
      }),
      new CognitoUserAttribute({
        Name: "name",
        Value: formData.name,
      }),
    ];

    getUserPool().signUp(
      formData.email,
      formData.password,
      attributeList,
      null,
      (err, result) => {
        if (err) {
          console.error("Signup error:", err);
          setError(err.message || "Signup failed. Please try again.");
          setLoading(false);
          return;
        }

        console.log("Signup successful:", result);
        setSuccess(true);
        setLoading(false);

        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      }}
    >
      <Card className="w-full max-w-md glass border-white/10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div
              className="p-4 rounded-2xl"
              style={{ background: "rgba(var(--color-primary), 0.2)" }}
            >
              <Sparkles
                className="w-8 h-8"
                style={{ color: "rgb(var(--color-primary))" }}
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Create Account
          </CardTitle>
          <p className="text-sm text-gray-400 mt-2">
            Join Craftantra AI and start creating
          </p>
        </CardHeader>

        <CardContent>
          {success ? (
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <p className="text-emerald-400 font-medium mb-1">
                Account created successfully!
              </p>
              <p className="text-sm text-gray-400">
                Redirecting to login...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <p className="text-sm text-rose-400">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="pl-10 bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="pl-10 bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    className="pl-10 bg-white/5 border-white/10 text-white"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  Must be at least 8 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    required
                    className="pl-10 bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full text-white"
                style={{
                  background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`,
                }}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </Button>

              <div className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium hover:underline"
                  style={{ color: "rgb(var(--color-primary))" }}
                >
                  Sign in
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
