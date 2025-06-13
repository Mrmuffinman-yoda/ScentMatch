"use client";
import React, { useEffect, useState } from "react";
import HouseHead from "@/app/components/house/HouseHead";
import { DesignerPill, ExpensivePill } from "@/app/components/house/Infopills";
import { usePathname } from "next/navigation";
import TopThree from "@/app/components/house/TopThree";
import PageContainer from "@/app/components/general/PageContainer";

type HouseData = {
  id: number;
  name: string;
  slug: string;
  founded: number;
  country_of_origin: string;
  logo_url: string;
  website_url: string;
  description: string;
};

const Page = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const house = pathSegments[2];

  const [houseData, setHouseData] = useState<HouseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHouse() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/house?slug=${house}`);
        if (!res.ok) throw new Error("Failed to fetch house info");
        const data = await res.json();
        setHouseData(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error");
      } finally {
        setLoading(false);
      }
    }
    if (house) fetchHouse();
  }, [house]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!houseData) return <div>No data found.</div>;

  return (
    <>
      <PageContainer>
        <HouseHead
          house_name={houseData.name}
          description={houseData.description}
          logo_url='/api/minio/scentmatch/house/${houseData.slug}/logo.webp'
        >
          <DesignerPill />
          <ExpensivePill />
        </HouseHead>
      </PageContainer>

      <PageContainer>
        <TopThree />
      </PageContainer>

      <PageContainer>
        <div className="flex justify-center mt-4">
          <button className="btn btn-primary">View All Fragrances</button>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <a
            href={houseData.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary"
          >
            Official Website
          </a>
        </div>
      </PageContainer>
    </>
  );
};

export default Page;
