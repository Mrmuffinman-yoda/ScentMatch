"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import FragInfo from "@/app/components/fragrance/Fraginfo";
import PageContainer from "@/app/components/general/PageContainer";
import TopThree from "@/app/components/house/TopThree";
import { useState } from "react";

interface ApiResponse {
  id: number;
  name: string;
  description: string;
  slug: string;
  image_url: string;
}

const Page = () => {
  const pathname = usePathname();

  // Extract the dynamic route parameters from the pathname
  const pathSegments = pathname.split("/"); // Split the pathname into segments
  const house = pathSegments[2]; // Extract the 'house' segment
  const fragrance = pathSegments[3]; // Extract the 'fragrance' segment

  const slug = `${house}-${fragrance}`;
  const [data, setData] = useState<ApiResponse | null>(null);
  // call home
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/fragrance?slug=" + slug);
        if (!response.ok) {
          setData(null);
          return;
        }
        const result: ApiResponse = await response.json();
        setData(result);
      } catch (error) {
        setData(null);
        console.error("Error fetching data from FastAPI:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>House: {house}</h1>
      <h2>Fragrance: {fragrance}</h2>
      <PageContainer>
        {data ? (
          <FragInfo
            name={data.name}
            description={data.description}
            image={data.image_url}
            accords={[
              { name: "Iris", percent: 45 },
              { name: "Amber", percent: 25 },
              { name: "Vetiver", percent: 15 },
              { name: "Cedar", percent: 10 },
              { name: "Lavender", percent: 5 },
            ]}
          />
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">
              We're hard at work adding this fragrance!
            </h2>
            <p>
              Sorry, this fragrance is currently not available. Please check
              back soon.
            </p>
          </div>
        )}
      </PageContainer>

      <PageContainer>
        <h1 className="text-4xl font-bold mb-2 text-primary text-center">
          {" "}
          Top three clones{" "}
        </h1>
        <TopThree></TopThree>
      </PageContainer>
    </div>
  );
};

export default Page;
