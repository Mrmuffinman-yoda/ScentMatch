"use client";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface Props {
  children?: React.ReactNode;
  maxWidth?: string;
  disableAnim?: boolean;
  pb?: number;
}

const PageContainer = ({
  children,
  maxWidth = "max-w-7xl",
  disableAnim = false,
  pb = 10,
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  if (disableAnim) {
    return (
      <div ref={ref} className={`w-full ${maxWidth} mx-auto`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`w-full ${maxWidth} mx-auto pb-${pb}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageContainer;
