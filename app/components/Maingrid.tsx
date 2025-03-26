import React from "react";

interface Props {
  children: React.ReactNode;
}

const Maingrid = ({ children }: Props) => {
  return (
    <div data-theme="" className="p-6">
      {children}
    </div>
  );
};

export default Maingrid;
