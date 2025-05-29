"use client";

import React from "react";
import { usePathname } from "next/navigation";
import FragInfo from "@/app/components/fragrance/Fraginfo";
import PageContainer from "@/app/components/general/PageContainer";
import TopThree from "@/app/components/house/TopThree";
const Page = () => {
  const pathname = usePathname();

  // Extract the dynamic route parameters from the pathname
  const pathSegments = pathname.split("/"); // Split the pathname into segments
  const house = pathSegments[2]; // Extract the 'house' segment
  const fragrance = pathSegments[3]; // Extract the 'fragrance' segment

  return (
    <div>
      <h1>House: {house}</h1>
      <h2>Fragrance: {fragrance}</h2>
      <PageContainer>
        <FragInfo
          name="Dior Homme Intense 2025"
          description="Dior Homme Intense 2025 is a sophisticated and modern fragrance featuring powdery iris, amber, and woody notes. It is celebrated for its elegance and long-lasting performance."
          image="https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw0c433874/Y0479201/Y0479201_F047924709_E01_ZHC.jpg?sw=1280"
          accords={[
            { name: "Iris", percent: 45 },
            { name: "Amber", percent: 25 },
            { name: "Vetiver", percent: 15 },
            { name: "Cedar", percent: 10 },
            { name: "Lavender", percent: 5 },
          ]}
        />
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
