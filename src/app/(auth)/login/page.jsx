"use client";

import React, { useState, useRef, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validations/auth";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Eye, EyeOff } from "lucide-react";

import { login } from "@/api/auth";
import { useSignUpToastStore } from "@/stores/useSignUpToastStore";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { notifySuccess } from "@/utils/notifications";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({ resolver: yupResolver(loginSchema), mode: "onTouched" });

  async function onSubmit(data) {
    setLoading(true);
    try {
      await login(data.email, data.password);
      router.push("/home");
    } catch (err) {
      const msg = err?.message || "server error";
      if (msg.toLowerCase().includes("password")) {
        setError("password", { message: msg });
      } else if (msg.toLowerCase().includes("email")) {
        setError("email", { message: msg });
      } else {
        setError("password", { message: msg });
      }
    } finally {
      setLoading(false);
    }
  }

  const hasShownSignUpToast = useRef(false);

  const { signUpMessage, clearSignUpMessage } = useSignUpToastStore();

  useEffect(() => {
    if (signUpMessage && !hasShownSignUpToast.current) {
      notifySuccess(signUpMessage);
      clearSignUpMessage();
      hasShownSignUpToast.current = true;
    }
  }, [signUpMessage]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="card-base border-gray-600 shadow-2xl">
        <CardHeader>
          <CardTitle className="headings text-center">
            Login Your Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <FieldSet>
                <Field data-invalid={errors.email ? true : undefined}>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    aria-invalid={errors.email ? true : undefined}
                  />
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>
                <Field data-invalid={errors.password ? true : undefined}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        size="icon-sm"
                        variant="ghost"
                        className="rounded-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </InputGroupButton>
                    </InputGroupAddon>
                    <InputGroupInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      aria-invalid={errors.password ? true : undefined}
                    />
                  </InputGroup>
                  {errors.password && (
                    <FieldError>{errors.password.message}</FieldError>
                  )}
                </Field>
                <Field>
                  <Button type="submit" disabled={!isValid || loading}>
                    {loading ? "Logging in..." : "Log in"}
                  </Button>
                  <FieldDescription className="text-center">
                    Don't have an account?{" "}
                    <Link href="/signup">
                      <Button variant="link" className="p-0">
                        Sign up
                      </Button>
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldSet>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
