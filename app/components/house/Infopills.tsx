import React from "react";

const colorClasses: { [key: string]: string } = {
  p: "badge badge-primary",
  s: "badge badge-secondary",
  a: "badge badge-accent",
  i: "badge badge-info",
  su: "badge badge-success",
  w: "badge badge-warning",
  e: "badge badge-error",
};

type InfopillsProps = {
  color: keyof typeof colorClasses;
  children: React.ReactNode;
};

const Infopills = ({ color, children }: InfopillsProps) => {
  return <div className={colorClasses[color]}>{children}</div>;
};

export const DesignerPill = () => <Infopills color="p"> Designer </Infopills>;

export const ClonePill = () => <Infopills color="i">Clone</Infopills>;

export const NichePill = () => <Infopills color="a">Niche</Infopills>;

export const BudgetPill = () => <Infopills color="su">Budget</Infopills>;

export const ExpensivePill = () => <Infopills color="e">Expensive</Infopills>;
