import React from "react";
import Image from "next/image";

const BoldBox = () => {
  return (
    <section>
      <div className="p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Fragrance Hunting Made Simple
              </h2>

              <p className="mt-4 text-primary">
                Finding your perfect scent shouldn&apos;t be a guessing game.
                With thousands of options out there, it&apos;s easy to feel
                overwhelmed. That&apos;s why we built a recommendation system
                powered by real community data and smart algorithms — so you get
                suggestions tailored to your unique taste. Whether you&apos;re
                into fresh aquatics, sweet gourmands, or smoky ouds, we&apos;ll
                help you find your next signature fragrance without the hassle.
              </p>
            </div>
          </div>

          <div>
            <Image
              src="/api/minio/scentmatch/home/fragranceWalkGreen.webp"
              className="rounded"
              alt="Fragrance walk illustration"
              width={400}
              height={300}
              unoptimized
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoldBox;
