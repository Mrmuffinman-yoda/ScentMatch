import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
interface Fragrance {
  id: number;
  name: string;
  description: string;
  slug: string;
  image_url?: string;
}

const FragranceList = () => {
  const [fragrances, setFragrances] = useState<Fragrance[] | undefined>(
    undefined,
  );
  const [fragranceUrls, setFragranceUrls] = useState<{ [id: number]: string }>(
    {},
  );

  // Fetch the URL for a fragrance slug, throw or return dummy if not found
  async function fetchURL(slug: string): Promise<string> {
    const dummyUrl = "/fragrance/notfound";
    try {
      const res = await fetch(`/api/fragrance/url?slug=${slug}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      if (!data?.url) throw new Error("No url");
      return data.url;
    } catch {
      return dummyUrl;
    }
  }

  useEffect(() => {
    async function fetchTopFragrances() {
      try {
        const res = await fetch("/api/fragrance/core/current_top");
        if (!res.ok) {
          setFragrances([]);
          return;
        }
        const ids = await res.json();
        if (!Array.isArray(ids) || ids.length === 0) {
          setFragrances([]);
          return;
        }
        // Fetch fragrance details in parallel
        type TopFragranceId = { fragrance_id?: number; id?: number };
        const details = await Promise.all(
          ids.map(async (item: TopFragranceId | number) => {
            const id =
              typeof item === "number" ? item : (item.fragrance_id ?? item.id);
            const resp = await fetch(`/api/fragrance?fragrance_id=${id}`);
            if (!resp.ok) return null;
            return await resp.json();
          }),
        );
        const filtered = details.filter(Boolean);
        setFragrances(filtered);
        // Fetch URLs for each fragrance
        const urlMap: { [id: number]: string } = {};
        await Promise.all(
          filtered.map(async (fragrance: Fragrance) => {
            urlMap[fragrance.id] = await fetchURL(fragrance.slug);
          }),
        );
        setFragranceUrls(urlMap);
      } catch {
        setFragrances([]);
      }
    }
    fetchTopFragrances();
  }, []);

  return (
    <div className="p-4">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2">
          <h2 className="text-2xl md:text-3xl font-semibold opacity-80 tracking-wide font-cormorant-garamond">
            Most popular fragrances of this week
          </h2>
        </li>
        {fragrances === undefined && (
          <li className="p-4 text-center">Loading...</li>
        )}
        {fragrances && fragrances.length === 0 && (
          <li className="p-4 text-center">No fragrances found.</li>
        )}
        {fragrances &&
          fragrances.map((fragrance) => (
            <li
              className="list-row cursor-pointer hover:bg-base-200"
              key={fragrance.id}
              onClick={() => {
                const url =
                  fragranceUrls[fragrance.id] || "/fragrance/notfound";
                window.location.href = url;
              }}
            >
              <div>
                <Image
                  className="size-10 rounded-box"
                  src={`/api/minio/scentmatch/fragrance-card/${fragrance.slug}/card.webp`}
                  alt={fragrance.name}
                  width={40}
                  height={40}
                  unoptimized
                  onError={(event) => {
                    (event.currentTarget as HTMLImageElement).src =
                      "/api/minio/scentmatch/core/noimg.webp";
                  }}
                />
              </div>
              <div>
                <div>{fragrance.name}</div>
                {/* TODO: Brand/house can be added here in the future */}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FragranceList;
