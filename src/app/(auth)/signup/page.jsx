"use client";

import React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/api/auth";
import CardHeading from "../components/CardHeading";
import FormInput from "../components/FormInput";

export default function SignupPage() {
  const router = useRouter();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const name = nameRef.current?.value || "";
      const email = emailRef.current?.value || "";
      const password = passwordRef.current?.value || "";

      await signup(name, email, password);

      router.push("/login");
      nameRef.current.value = "";
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
        <CardHeading text={"Create Your Account"} />

        <div className="space-y-5">
          <FormInput
            type="text"
            id="name"
            label="Full Name"
            placeholder="Enter your full name"
            inputRef={nameRef}
            required
          />

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
            placeholder="Create a strong password"
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
            onClick={handleSignUp}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:bg-theme-blue-2/95 disabled:opacity-50 bg-theme-blue-2"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-theme-blue-1">
          Already have an account?{"  "}
          <a
            href="/login"
            className="font-semibold hover:underline text-theme-blue-2"
          >
            Log In
          </a>
        </p>
      </div>
      <p className="text-center mt-6 text-sm text-theme-blue-2">
        By signing up, you agree to our Terms & Privacy Policy
      </p>
    </>
  );
}
