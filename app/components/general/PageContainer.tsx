import React from "react";

interface Props {
  children?: React.ReactNode;
  maxWidth?: string; // Optional: allow custom max width
}

const PageContainer = ({ children, maxWidth = "max-w-6xl" }: Props) => {
  return <div className={`w-full ${maxWidth} mx-auto`}>{children}</div>;
};

export default PageContainer;
