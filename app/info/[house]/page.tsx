"use client";
import React from "react";
import HouseHead from "@/app/components/house/HouseHead";
import { DesignerPill, ExpensivePill } from "@/app/components/house/Infopills";
import { usePathname } from "next/navigation";
import TopThree from "@/app/components/house/TopThree";
import PageContainer from "@/app/components/general/PageContainer";
const page = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const house = pathSegments[2];
  /*
  TODO, get house object with name and set house_name with details
  TODO, from the object
  */

  const d = "Dior is an expensive house to buy from lol";
  return (
    <>
      <PageContainer>
        <div>
          <HouseHead
            house_name="Dior"
            description={d}
            logo_url="http://localhost:9000/scentmatch/house/dior.png"
          >
            <DesignerPill />
            <ExpensivePill />
          </HouseHead>
        </div>
      </PageContainer>
      <PageContainer>
        <div>
          <TopThree />
        </div>
      </PageContainer>
    </>
  );
};

export default page;
