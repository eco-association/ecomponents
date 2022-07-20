import React from "react";

import moment from "moment";
import _ from "lodash";

import Chart from "react-apexcharts/dist/react-apexcharts.min.js";

type TooltipType = {
  series: any[][];
  seriesIndex: number;
  dataPointIndex: number;
  w: any;
};

export type Series = {
  name: string;
  data: {
    x: number | string | Date;
    y: number;
    fillColor?: string | undefined;
    strokeColor?: string | undefined;
    meta?: any;
  }[];
};

type xAxisType = "category" | "numeric" | "datetime";

export type AreaChartProps = {
  chartTitle: string;
  series: Series[];
  colors: string[];
  xAxisType: xAxisType;
  curve?: "straight" | "smooth" | "stepline";
  stacked?: boolean;
  // Optionally label data, length must be = to data slice
  dataLabels?: string[];
};

const AreaChart = ({
  chartTitle,
  series,
  colors,
  xAxisType = "numeric",
  curve = "straight",
  stacked = false,
}: AreaChartProps): JSX.Element => {
  const options = {
    chart: {
      stacked,
      redrawOnWindowResize: true,
      id: chartTitle,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 1,
        opacityTo: 0.4,
      },
    },
    stroke: {
      curve,
    },
    colors: colors as any[],
    xaxis: {
      type: xAxisType,
      labels: {
        formatter: (val: any, _: number) => {
          if (xAxisType === "datetime") {
            return `${moment(val).format("MMM DD, 'YY")}`;
          } else {
            return val;
          }
        },
      },
    },
    yaxis: {
      //   max: ceilingBy(yMax, 100),
      tickAmount: 5,
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "Founders Grotesk",
          fontWeight: 400,
        },
        formatter: (val: number, _: number) => val.toFixed(0).toLocaleString(),
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    series,
    tooltip: tooltip(series, xAxisType, colors),
  };

  return (
    <div key="area-chart" className="w-full">
      <h3 className="text-lg ml-4 font-medium">{chartTitle}</h3>
      {series.length > 1 ? (
        <div className="flex gap-4 font-lato mt-3">
          {series.map((group, i) => {
            return (
              <div key={group.name} className="text-xs flex items-center">
                <div
                  style={{ backgroundColor: colors[i] }}
                  className="w-2 h-2 mr-1 rounded-sm"
                />
                {group.name}
              </div>
            );
          })}
        </div>
      ) : null}
      <Chart options={options} series={series} type="area" />
    </div>
  );
};

const tooltip = (series: Series[], xAxisType: xAxisType, colors: string[]) => ({
  enabled: true,
  custom: ({
    series: _series,
    seriesIndex,
    dataPointIndex,
    w,
  }: TooltipType) => {
    let category = series[seriesIndex].data[dataPointIndex].x;
    if (xAxisType === "datetime") {
      category = moment(series[seriesIndex].data[dataPointIndex].x).format(
        "MMM DD, YYYY"
      );
    }

    const reversedSeries = _.reverse([...series]);

    const legend =
      '<div class="flex flex-col gap-1">' +
      reversedSeries
        .map((group, i) => {
          const value = group.data[dataPointIndex].y;

          return `
            <div class="text-xs flex items-center gap-1">
              <div
                style="background-color:${colors[series.length - 1 - i]}"
                class="w-2 h-2 rounded-sm"
              >
              </div>
              <div class="flex gap-1">
                <div class="font-medium">
                ${group.name}:
                </div> ${value.toLocaleString()}
              </div>
            </div>
          `;
        })
        .join(``) +
      "</div>";

    return `
      <div class="arrow_box p-3 bg-white text-black text-xs w-72">
        <div class="flex flex-col gap-2">
          <div class="text-sm">
            ${category}
          </div>
          ${legend}
        </div>
      </div>
      `;
  },
});

export default AreaChart;
