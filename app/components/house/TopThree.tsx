import React from "react";
import FragranceCard from "../general/FragranceCard";
import { DesignerPill, ExpensivePill } from "./Infopills";

interface CloneData {
  // basically fragrance data
  id: number;
  name: string;
  description: string;
  slug: string;
}

interface Props {
  clones?: CloneData[] | null;
  isLoading?: boolean;
}

const TopThree = ({ clones, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="p-2 flex flex-wrap flex-row gap-4 justify-center">
        {clones &&
          clones.slice(0, 3).map((clone) => (
            <FragranceCard
              key={clone.id}
              title={clone.name}
              isNew={false}
              description={clone.description}
              slug={clone.slug}
            >
              <DesignerPill />
              <ExpensivePill />
            </FragranceCard>
          ))}
      </div>
    </div>
  );
};

export default TopThree;
