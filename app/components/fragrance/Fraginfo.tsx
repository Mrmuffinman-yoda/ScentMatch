import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface Accords {
  name: string;
  percent: number; // 0-100
}

interface FragInfoProps {
  name: string;
  description: string;
  accords?: Accords[];
  images: string[];
}

// Example notes if not provided
const defaultAccords: Accords[] = [
  { name: "Bergamot", percent: 60 },
  { name: "Pepper", percent: 40 },
  { name: "Ambroxan", percent: 30 },
  { name: "Lavender", percent: 20 },
];

const FragInfo: React.FC<FragInfoProps> = ({
  name,
  images,
  description,
  accords = defaultAccords,
}) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images]);

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
              <Image
                key={idx}
                src={img}
                className="w-full h-full flex-shrink-0 object-cover"
                alt={`Slide ${idx + 1}`}
                width={800}
                height={450}
                priority={idx === 0}
                unoptimized
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
                  <motion.div
                    className="bg-warning h-3 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: `${accord.percent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
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
