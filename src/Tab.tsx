import React from "react";

export interface TabProps {
  name: string;
  label?: string;
}

export const Tab: React.FC<React.PropsWithChildren<TabProps>> = ({
  children,
}) => {
  return <React.Fragment>{children}</React.Fragment>;
};
