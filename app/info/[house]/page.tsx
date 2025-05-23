"use client";
import React from "react";
import HouseHead from "@/app/components/house/HouseHead";
import { DesignerPill, ExpensivePill } from "@/app/components/house/Infopills";
import { usePathname } from "next/navigation";
import TopThree from "@/app/components/house/TopThree";
import PageContainer from "@/app/components/general/PageContainer";
const Page = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const house = pathSegments[2];
  /*
  TODO, get house object with name and set house_name with details
  TODO, from the object
  */

  const d =
    "Founded in 1946, Dior is renowned for its luxurious and innovative fragrances";

  return (
    <>
      {house}
      <PageContainer>
        <HouseHead
          house_name="Dior"
          description={d}
          logo_url="http://localhost:9000/scentmatch/house/dior.png"
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
            href="https://dior.com"
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
