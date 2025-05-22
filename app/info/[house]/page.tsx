"use client";
import React from "react";
import HouseHead from "@/app/components/house/HouseHead";
import { DesignerPill, ExpensivePill } from "@/app/components/house/Infopills";
import { usePathname } from "next/navigation";

const page = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/"); // Split the pathname into segments
  const house = pathSegments[2];

  const d = "Dior is an expensive house to buy from lol";
  return (
    <div>
      <HouseHead
        house_name="Dior"
        description={d}
        logo_url="http://localhost:9000/scentmatch/house/dior.png"
      >
        <ExpensivePill />
        <DesignerPill />
      </HouseHead>
    </div>
  );
};

export default page;
