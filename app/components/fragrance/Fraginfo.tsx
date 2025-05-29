import React, { useEffect, useState } from "react";

interface Accords {
  name: string;
  percent: number; // 0-100
}

interface FragInfoProps {
  name: string;
  image: string;
  description: string;
  accords?: Accords[];
}

const images = [
  "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw0c433874/Y0479201/Y0479201_F047924709_E01_ZHC.jpg?sw=1280",
  "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw42bfcfbf/Y0479201/Y0479201_F047924709_E02_GHC.jpg?sw=1280",
  "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw80ca6ba1/Y0479201/Y0479201_F047924709_E03_GHC.jpg?sw=1280",
  "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw13e65c65/Y0479201/Y0479201_F047924709_E04_GHC.jpg?sw=1280",
];

// Example notes if not provided
const defaultAccords: Accords[] = [
  { name: "Bergamot", percent: 60 },
  { name: "Pepper", percent: 40 },
  { name: "Ambroxan", percent: 30 },
  { name: "Lavender", percent: 20 },
];

const FragInfo: React.FC<FragInfoProps> = ({
  name,
  image,
  description,
  accords = defaultAccords,
}) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-stretch">
      {/* Carousel */}
      <div className="flex-1">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl shadow-lg">
          <div
            className="flex transition-transform duration-700 ease-in-out w-full h-full"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                className="w-full h-full flex-shrink-0 object-cover"
                alt={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="flex w-full justify-center gap-2 py-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`btn btn-xs ${active === idx ? "btn-primary" : ""}`}
              onClick={() => setActive(idx)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
      {/* Side Box */}
      <div className="w-full md:w-72 bg-base-200 rounded-xl shadow-lg p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2 text-primary">{name}</h2>
          <p className="mb-4 text-sm text-gray-500">{description}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Main accord</h3>
          <div className="space-y-2">
            {accords.map((accord) => (
              <div key={accord.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{accord.name}</span>
                  <span>{accord.percent}%</span>
                </div>
                <div className="w-full bg-gray-300 rounded h-3">
                  <div
                    className="bg-primary h-3 rounded"
                    style={{ width: `${accord.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FragInfo;
