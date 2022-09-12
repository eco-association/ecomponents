import React from "react";

import GridItem from "./GridItem";
import GridContainer from "./GridContainer";
import { GridContainerProps } from "./types";

export class Grid extends React.Component<GridContainerProps> {
  static Item = GridItem;

  render(): React.ReactElement {
    return <GridContainer {...this.props} />;
  }
}

export default Grid;
