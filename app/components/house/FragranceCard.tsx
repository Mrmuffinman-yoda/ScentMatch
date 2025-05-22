import React from "react";

interface Props {
  title: string;
  description: string;
  isNew: boolean;
  children?: React.ReactNode;
}

const FragranceCard = ({ title, description, isNew, children }: Props) => {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
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
      </div>
    </div>
  );
};

export default FragranceCard;
