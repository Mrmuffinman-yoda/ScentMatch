import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  isNew: boolean;
  children?: React.ReactNode;
  slug?: string;
}

const FragranceCard = ({
  title,
  description,
  isNew,
  children,
  slug,
}: Props) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        y: -4,
      }}
      transition={{ type: "tween", stiffness: 300, damping: 20 }}
      className="card bg-base-100 w-83 shadow-sm cursor-pointer"
    >
      <figure>
        <Image
          src={`/api/minio/scentmatch/fragrance-card/${slug}/card.webp`}
          alt={title}
          width={200}
          height={200}
          unoptimized
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          {isNew && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <p>{description}</p>
        <button className="btn btn-soft btn-primary w-auto self-end">
          View
        </button>
        <div className="card-actions justify-end">{children}</div>
      </div>
    </motion.div>
  );
};

export default FragranceCard;
