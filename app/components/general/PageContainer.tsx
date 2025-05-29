"use client";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface Props {
  children?: React.ReactNode;
  maxWidth?: string;
  disableAnim?: boolean;
}

const PageContainer = ({
  children,
  maxWidth = "max-w-6xl",
  disableAnim = false,
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
      className={`w-full ${maxWidth} mx-auto pb-10`}
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
