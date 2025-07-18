import React from "react";

const Hero = () => {
  return (
    <div className="hero bg-base-200 relative overflow-hidden">
      <video
        src="/api/minio-video/scentmatch/myself_hero_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain"
        preload="auto"
      ></video>
      <div className="hero-content text-center absolute inset-0 flex items-center justify-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Find your match</h1>
          <p className="py-6 text-primary">
            Delve into the world of fragrances and discover your perfect scent.
            From cool refreshing scents to warm, spicy notes, we have something
            for everyone.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
