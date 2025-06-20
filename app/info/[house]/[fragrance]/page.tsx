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

interface Accord {
  id: number;
  slug: string;
  accord: string;
  percentage: number;
}

interface CloneResponse {
  id: number;
  name: string;
  description: string;
  slug: string;
  image_url: string;
}

interface CarouselResponse {
  id: number;
  slug: string;
  image_count: number;
}

const Page = () => {
  const pathname = usePathname();

  // Extract the dynamic route parameters from the pathname
  const pathSegments = pathname.split("/"); // Split the pathname into segments
  // const house = pathSegments[2]; // Extract the 'house' segment
  const fragrance = pathSegments[3]; // Extract the 'fragrance' segment

  const slug = `${fragrance}`;
  const [data, setData] = useState<ApiResponse | null | undefined>(undefined);
  const [accords, setAccords] = useState<Accord[] | undefined>(undefined);

  // Carousel images state
  const [carouselImages, setCarouselImages] = useState<string[] | undefined>(
    undefined
  );

  // Fetch carousel images from API
  useEffect(() => {
    async function fetchCarouselImages() {
      setCarouselImages(undefined); // loading state
      try {
        const response = await fetch(
          `/api/fragrance/carousel?fragrance_slug=${slug}`
        );
        if (!response.ok) {
          setCarouselImages([]);
          return;
        }
        const result: CarouselResponse[] = await response.json();
        if (!result || result.length === 0) {
          setCarouselImages([]);
          return;
        }
        // Assuming only one entry per slug
        const imageCount = result[0].image_count;
        const basePath = `/api/minio/scentmatch/carousel/${result[0].slug}/`;
        const images = Array.from(
          { length: imageCount },
          (_, i) => `${basePath}${i + 1}.webp`
        );
        setCarouselImages(images);
      } catch (error) {
        setCarouselImages([]);
        console.error("Error fetching carousel images:", error);
      }
    }
    fetchCarouselImages();
  }, [slug]);

  // generate imagelist for carousel with the
  // determined path and count of images
  // path is `/api/fragrance/carousel?fragrance_slug=${slug}`
  // and count is the number of images in the carousel
  // the images are named 1,2,3,4.webp

  // retrieve images list from API

  // Fetch top three clones for this fragrance
  const [topClones, setTopClones] = useState<
    CloneResponse[] | null | undefined
  >(undefined);

  // call home
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/fragrance?slug=" + slug);
        if (!response.ok) {
          setData(null);
          return;
        }
        const result: ApiResponse | { detail: string } = await response.json();
        if (
          typeof result === "object" &&
          "detail" in result &&
          result.detail === "Fragrance not found"
        ) {
          setData(null);
          return;
        }
        setData(result as ApiResponse);
      } catch (error) {
        setData(null);
        console.error("Error fetching data from FastAPI:", error);
      }
    }
    setData(undefined); // set loading state
    fetchData();
  }, [slug]);

  useEffect(() => {
    async function fetchAccords() {
      try {
        setAccords(undefined); // loading state
        const response = await fetch(`/api/fragrance/accords?slug=${slug}`);
        if (!response.ok) {
          setAccords([]);
          return;
        }
        const result: Accord[] = await response.json();
        setAccords(result);
      } catch (error) {
        setAccords([]);
        console.error("Error fetching accords:", error);
      }
    }
    fetchAccords();
  }, [slug]);

  useEffect(() => {
    async function fetchTopClones(fragranceId: number) {
      setTopClones(undefined); // loading state
      try {
        const response = await fetch(
          `/api/fragrance/topthree?fragrance_id=${fragranceId}`
        );
        if (!response.ok) {
          setTopClones(null);
          return;
        }
        const result = await response.json();
        console.debug("Top clones API result:", result); // Debug output
        setTopClones(result);
      } catch (error) {
        setTopClones(null);
        console.error("Error fetching top clones:", error);
      }
    }
    if (data && data.id) {
      fetchTopClones(data.id);
    }
  }, [data]);

  if (data === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (data === null) {
    return (
      <div>
        <PageContainer>
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">
              We&apos;re hard at work adding this fragrance!
            </h2>
            <p>
              Sorry, this fragrance is currently not available. Please check
              back soon.
            </p>
          </div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div>
      <PageContainer>
        <FragInfo
          name={data.name}
          description={data.description}
          images={carouselImages ?? []}
          accords={
            accords && accords.length > 0
              ? accords.map((a) => ({ name: a.accord, percent: a.percentage }))
              : []
          }
        />
      </PageContainer>

      <PageContainer>
        <h1 className="text-4xl font-bold mb-2 text-primary text-center">
          Top three clones
        </h1>
        <TopThree clones={topClones} isLoading={topClones === undefined} />
      </PageContainer>
    </div>
  );
};

export default Page;
