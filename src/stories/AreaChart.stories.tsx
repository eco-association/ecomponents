import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AreaChart } from "..";

import colors from "../styles/colors";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/AreaChart",
  component: AreaChart,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AreaChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AreaChart> = (args) => (
  <AreaChart {...args} />
);

export const BasicChart = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BasicChart.args = {
  chartTitle: "Chart Title",
  series: [
    {
      name: "Series 1",
      data: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ],
    },
  ],
  colors: [colors.accentTeal],
};
