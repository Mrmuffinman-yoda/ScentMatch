import React from "react";
import { motion } from "motion/react";

interface Props {
  title: string;
  description: string;
  isNew: boolean;
  children?: React.ReactNode;
}

const FragranceCard = ({ title, description, isNew, children }: Props) => {
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
        <img src="/api/minio/scentmatch/core/noimg.png" alt="Shoes" />
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
