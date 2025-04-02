"use client";
import { useEffect, useState } from "react";

// Define the interface for the API response
interface User {
  username: string;
  email: string;
}

interface ApiResponse {
  user: User;
  image_url: string;
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/hello");
        const result: ApiResponse = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data from FastAPI:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to the Next.js App with FastAPI!</h1>
      {data ? (
        <div>
          <h2>User Information</h2>
          <p>
            <strong>Username:</strong> {data.user.username}
          </p>
          <p>
            <strong>Email:</strong> {data.user.email}
          </p>
          <img src={data.image_url} alt={`${data.user.username}'s profile`} />
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
