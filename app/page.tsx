"use client";
import FragranceList from "./components/FragranceList";
import Hero from "./components/home/Hero";
import { useEffect, useState } from "react";
import BoldBox from "./components/general/BoldBox";

import PageContainer from "./components/general/PageContainer";


export default function Home() {
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
    </div>
  );
}