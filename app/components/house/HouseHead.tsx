import React from "react";
import Image from "next/image";

interface Props {
  house_name: string;
  description: string;
  logo_url: string;
  children?: React.ReactNode;
}

const HouseHead = ({ house_name, description, logo_url, children }: Props) => {
  return (
    <div className="card lg:card-side bg-base-200 shadow-sm h-100 p-6">
      <figure>
        <Image
          className="h-12"
          src={logo_url}
          alt={`Logo of ${house_name}`}
          width={48}
          height={48}
          unoptimized
        />
      </figure>
      <div className="card-body">
        <h1 className="card-title text-3xl text-primary">{house_name}</h1>
        <p>{description}</p>
        <div className="card-actions justify-end">{children}</div>
      </div>
    </div>
  );
};

export default HouseHead;
