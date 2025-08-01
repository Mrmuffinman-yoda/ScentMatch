// app/api/core/login/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { detail: "Email and password are both required" },
        { status: 400 },
      );
    }

    const fastapiResponse = await fetch(
      `http://fastapi-server:8001/user/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(
          password,
        )}`,
      },
    );

    const data = await fastapiResponse.json();

    if (!fastapiResponse.ok) {
      return NextResponse.json(
        { detail: data.detail || "Login failed" },
        { status: fastapiResponse.status },
      );
    }

    const { session_token, id, username: userUsername, expiry } = data;

    if (!session_token) {
      return NextResponse.json(
        { detail: "Login successful, but no session token received." },
        { status: 500 },
      );
    }

    const response = NextResponse.json(
      { message: "Login successful", id, username: userUsername },
      { status: 200 },
    );

    response.cookies.set("session_token", session_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiry,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Login API route error:", error);
    return NextResponse.json(
      { detail: "Internal server error." },
      { status: 500 },
    );
  }
}
