"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
}

interface LoginInput {
  username: string;
  password: string;
}

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null); // To display login errors
  const [isLoggingIn, setIsLoggingIn] = useState(false); // To prevent multiple login attempts
  const router = useRouter(); // Use Next.js router for navigation
  const handleVarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    Func: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    Func(e.target.value);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null); // Clear previous errors

    if (!username || !password) {
      setLoginError("Please enter both username and password.");
      return;
    }

    setIsLoggingIn(true); // Set loading state
    const loginData: LoginInput = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("/api/core/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        console.error("Login failed with status:", response.status);
        throw new Error("Login failed");
      }

      const data: LoginResponse = await response.json();
      console.log("Login response:", data);
      if (data.message === "Login successful") {
        // Token already handled by api
        // redirect to homepage
        console.log("Login successful, redirecting to home page");

        router.push("/");
      } else {
        setLoginError(
          data.message || "Login failed. Please check your credentials.",
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("An error occurred during login. Please try again.");
    } finally {
      setIsLoggingIn(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* login page */}
      <Image
        className="rounded-box"
        src="/api/minio/scentmatch/core/logoWithText.webp"
        alt="ScentMatch Logo"
        width={288}
        height={160}
        unoptimized
      />
      <form onSubmit={handleLoginSubmit} className="">
        <div className="form-control w-full max-w-xs">
          <input
            type="text"
            placeholder="email"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => handleVarChange(e, setUsername)}
            value={username}
          />
        </div>

        <div className="form-control w-full max-w-xs pt-5">
          <input
            type="password"
            placeholder="password"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => handleVarChange(e, setPassword)}
            value={password}
          />
        </div>

        {loginError && (
          <p className="text-red-500 text-sm mt-2">{loginError}</p>
        )}

        <button type="submit" className="btn mt-4" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging In..." : "Login"}
        </button>
        <div className="mt-4">
          <a href="/register" className="link">
            Don&apos;t have an account? Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default Page;
