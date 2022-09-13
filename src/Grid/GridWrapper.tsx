import React from "react";

import GridItem from "./GridItem";
import GridContainer from "./GridContainer";
import { GridContainerProps } from "./types";

export const Grid = ({ ...props }: GridContainerProps) => {
  return <GridContainer {...props} />;
};

Grid.Item = GridItem;
