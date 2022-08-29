import React, { ReactNode } from "react";

export type CardProps = {
  title: string | ReactNode;
  children: ReactNode;
};

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="bg-eco-lightest-gray shadow rounded-md">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-black ">{title}</h2>
      </div>
      <div className="border-t border-eco-light-gray px-4 py-5 sm:px-6">
        {children}
      </div>
    </div>
  );
};
