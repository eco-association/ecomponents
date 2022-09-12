import React, { useState } from "react";
import styled from "@emotion/styled";
import { Row } from "./Row";
import { TabProps } from "./Tab";

const TabsContainer = styled.div({
  padding: "0 16px 8px 16px",
  backgroundColor: "#F7FAFC",
});

const TabHeaderItem = styled.div<{ active?: boolean }>(({ theme, active }) => ({
  padding: "8px 16px",
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: active ? "#ADC5D4" : "#C7D9E4",
  color: active ? theme.palette.text.primary : theme.palette.secondary.main,
  ...(active ? {} : { cursor: "pointer" }),
}));

const Line = styled.div({
  flexGrow: 1,
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#C7D9E4",
});

export const Tabs: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [selected, setSelected] = useState<string>(() => {
    const child = React.Children.toArray(children)[0];
    if (React.isValidElement(child)) return child.props.name;
  });

  return (
    <TabsContainer>
      <Row>
        {React.Children.map(children, (element) => {
          if (!React.isValidElement(element)) return null;
          const props = element.props as TabProps;
          const label = props.label || props.name;
          return (
            <TabHeaderItem
              active={props.name === selected}
              onClick={() => setSelected(props.name)}
            >
              {label}
            </TabHeaderItem>
          );
        })}
        <Line />
      </Row>
      {React.Children.map(children, (element) => {
        if (!React.isValidElement(element)) return null;
        const props = element.props as TabProps;
        if (props.name !== selected) return null;
        return element;
      })}
    </TabsContainer>
  );
};
