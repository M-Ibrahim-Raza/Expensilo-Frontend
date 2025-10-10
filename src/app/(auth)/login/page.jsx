"use client";

import React from "react";
import { login } from "@/utils/auth";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CardHeading from "../components/CardHeading";
import FormInput from "../components/FormInput";

export default function SignupPage() {
  const router = useRouter();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const email = emailRef.current?.value || "";
      const password = passwordRef.current?.value || "";

      await login(email, password);

      router.push("/home");

      emailRef.current.value = "";
      passwordRef.current.value = "";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <CardHeading text={"Login Your Account"} />

        <div className="space-y-5">
          <FormInput
            type="email"
            id="email"
            label="Email Address"
            placeholder="Enter your email"
            inputRef={emailRef}
            required
          />

          <FormInput
            id="password"
            label="Password"
            placeholder="Enter your password"
            is_password
            inputRef={passwordRef}
            required
          />

          {error && (
            <div className="p-3 rounded-xl text-sm bg-red-50 text-red-600">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:bg-theme-blue-2/95 disabled:opacity-50 bg-theme-blue-2"
          >
            {loading ? "Creating Account..." : "Sign Up"}
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
