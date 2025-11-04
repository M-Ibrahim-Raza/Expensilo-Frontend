"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/api/auth";
import { useSignUpToastStore } from "@/stores/useSignUpToastStore";

import CardHeading from "../../app/(auth)/components/CardHeading";
import FormInput from "../../app/(auth)/components/FormInput";

import { notifySuccess } from "@/utils/notifications";

export default function LoginPage() {
  const router = useRouter();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const hasShownSignUpToast = useRef(false);

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { signUpMessage, clearSignUpMessage } = useSignUpToastStore();

  useEffect(() => {
    if (signUpMessage && !hasShownSignUpToast.current) {
      notifySuccess(signUpMessage);
      clearSignUpMessage();
      hasShownSignUpToast.current = true;
    }
  }, [signUpMessage]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let isError = false;

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Email is required");
      isError = true;
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid email address");
      isError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      isError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isError = true;
    }

    if (isError) {
      return;
    }

    setLoading(true);

    try {
      await login(email, password);

      router.push("/home");

      emailRef.current.value = "";
      passwordRef.current.value = "";
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <CardHeading text={"Login Your Account"} />

        <div className="space-y-3">
          <FormInput
            type="email"
            id="email"
            label="Email Address"
            placeholder="Enter your email"
            inputRef={emailRef}
            required
          />

          {emailError && (
            <div className="p-3 mb-6 rounded-xl text-sm bg-red-50 text-red-600">
              {emailError}
            </div>
          )}

          <FormInput
            id="password"
            label="Password"
            placeholder="Enter your password"
            is_password
            inputRef={passwordRef}
            required
          />

          {passwordError && (
            <div className="p-3 mb-6 rounded-xl text-sm bg-red-50 text-red-600">
              {passwordError}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:bg-theme-blue-2/95 disabled:opacity-50 bg-theme-blue-2"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-theme-blue-1">
          Don't have an account?{"  "}
          <a
            href="/signup"
            className="font-semibold hover:underline text-theme-blue-2"
          >
            Sign Up
          </a>
        </p>
      </div>
    </>
  );
}
