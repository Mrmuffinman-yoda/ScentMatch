"use client";
import FragranceList from "./components/FragranceList";
import Hero from "./components/home/Hero";
import { useEffect, useState } from "react";
import BoldBox from "./components/general/BoldBox";

import PageContainer from "./components/general/PageContainer";

// Define the interface for the API response
interface ApiResponse {
  username: string;
  email: string;
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
      <PageContainer>
        <Hero />
      </PageContainer>
      <PageContainer>
        <BoldBox />
      </PageContainer>
      <PageContainer>
        <FragranceList />
      </PageContainer>
      <h1>Welcome to the Next.js App with FastAPI!</h1>
      {data ? (
        <div>
          <h2>User Information</h2>
          <p>
            <strong>Username:</strong> {data.username}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <img src={data.image_url} alt={`${data.username}'s profile`} />
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}