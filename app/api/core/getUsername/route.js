import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Get session token from cookies
    const cookieHeader = request.headers.get("cookie");
    let session_token = null;

    if (cookieHeader) {
      const cookies = cookieHeader.split(";").map((cookie) => {
        const [name, value] = cookie.trim().split("=");
        return { name: name.trim(), value: value.trim() };
      });

      const sessionCookie = cookies.find(
        (cookie) => cookie.name === "session_token",
      );
      if (sessionCookie) {
        session_token = sessionCookie.value;
      }
    }

    // If no session token found, return unauthorized
    if (!session_token) {
      return NextResponse.json(
        { detail: "No session token found" },
        { status: 401 },
      );
    }

    // Call FastAPI session endpoint to get user info
    const fastapiResponse = await fetch(
      `http://fastapi-server:8001/user-session`,
      {
        method: "GET",
        headers: {
          "session-token": session_token,
        },
      },
    );

    const data = await fastapiResponse.json();

    if (!fastapiResponse.ok) {
      return NextResponse.json(
        { detail: data.detail || "Failed to get user info" },
        { status: fastapiResponse.status },
      );
    }

    // Return the username
    const { username } = data;

    return NextResponse.json(
      {
        message: "User info retrieved successfully",
        username,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get user API route error:", error);
    return NextResponse.json(
      { detail: "Internal server error." },
      { status: 500 },
    );
  }
}
