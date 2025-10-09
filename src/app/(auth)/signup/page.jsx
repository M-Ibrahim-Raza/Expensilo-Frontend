"use client";

import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CardHeading from "../components/CardHeading";
import FormInput from "../components/FormInput";

export default function SignupPage() {
  const router = useRouter();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = {
        name: nameRef.current?.value || "",
        email: emailRef.current?.value || "",
        password: passwordRef.current?.value || "",
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/auth/signup",
        formData,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      router.push("/login");

      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
    } catch (err) {
      if (err.response && err.response.data) {
        setError(
          err.response.data.detail || "Signup failed. Please try again."
        );
      } else {
        setError("Network error. Please check your connection.");
      }
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
            onClick={handleSubmit}
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
            Sign Up
          </a>
        </p>
      </div>
      <p className="text-center mt-6 text-sm text-theme-blue-2">
        By signing up, you agree to our Terms & Privacy Policy
      </p>
    </>
  );
}
