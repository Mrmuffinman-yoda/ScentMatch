import React from "react";

const BoldBox = () => {
  return (
    <section>
      <div data-theme="" className="p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h2>

              <p className="mt-4 text-primary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                doloremque saepe architecto maiores repudiandae amet perferendis
                repellendus, reprehenderit voluptas sequi.
              </p>
            </div>
          </div>

          <div>
            <img
              src="/api/minio/scentmatch/home/fragranceWalkGreen.png"
              className="rounded"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoldBox;
