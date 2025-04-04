"use client";

import React from "react";
import { usePathname } from "next/navigation";

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
    </div>
  );
};

export default Page;
