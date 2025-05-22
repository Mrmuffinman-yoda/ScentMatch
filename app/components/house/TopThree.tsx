import React from "react";
import FragranceCard from "./FragranceCard";
import { DesignerPill, ExpensivePill } from "./Infopills";

const TopThree = () => {
  // TODO:Pass house object into this component
  // TODO: Retrieve top three fragrances from the house object

  const d = "This is a iris forward fragrance";
  return (
    <div>
      <div className="p-2 flex flex-wrap flex-row gap-4 justify-center">
        <FragranceCard
          title="Dior Homme Intense 2025"
          isNew={true}
          description={d}
        >
          <DesignerPill />
          <ExpensivePill />
        </FragranceCard>

        <FragranceCard
          title="Dior Sauvage Eau de Parfum"
          isNew={false}
          description={d}
        >
          <DesignerPill />
          <ExpensivePill />
        </FragranceCard>
        <FragranceCard
          title="Dior Fahrenheit Le Parfum"
          isNew={false}
          description={d}
        >
          <DesignerPill />
          <ExpensivePill />
        </FragranceCard>
      </div>
    </div>
  );
};

export default TopThree;
