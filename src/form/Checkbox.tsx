import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "../hooks";
import { Color } from "../types";

interface CheckboxProps
  extends Omit<
    React.HTMLProps<HTMLInputElement>,
    "as" | "checked" | "onChange"
  > {
  checked?: boolean;
  color?: Color | string;
  checkColor?: Color | string;
  backgroundColor?: string;
  height?: number;
  width?: number;

  onChange?(checked: boolean): void;
}

const Input = styled.input({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
});

const Box = styled.svg<CheckboxProps>(
  ({ height, width, color, backgroundColor }) => ({
    height,
    width,
    backgroundColor,
    borderRadius: 2,
    cursor: "pointer",
    display: "inline-block",
    border: `1px solid ${color}`,
  })
);

const CheckboxContainer = styled.label({
  display: "flex",
  flexDirection: "row",
  alignContent: "center",
});

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  width = 16,
  height = 16,
  color: rawColor = "#38654a",
  checkColor: rawCheckColor,
  backgroundColor: rawBackgroundColor,
  ...props
}: CheckboxProps) => {
  const theme = useTheme();
  const themeColor = theme.palette[rawColor as Color]?.main;
  const color = themeColor || rawColor;
  const checkColor = rawCheckColor || color;
  const backgroundColor =
    rawBackgroundColor ||
    (themeColor && theme.palette[rawColor as Color]?.bg) ||
    "white";
  return (
    <CheckboxContainer>
      <Input
        type="checkbox"
        {...props}
        onChange={() => onChange && onChange(!checked)}
      />
      <Box
        fill="none"
        aria-hidden="true"
        viewBox="0 0 24 24"
        color={color}
        width={width}
        height={height}
        backgroundColor={backgroundColor}
      >
        {checked && (
          <>
            <line
              x1="8.79289"
              y1="17.2929"
              x2="18.7929"
              y2="6.29289"
              stroke={checkColor}
              strokeWidth="2"
            />
            <line
              x1="6.20711"
              y1="12.29289"
              x2="10.20711"
              y2="17.2929"
              stroke={checkColor}
              strokeWidth="2"
            />
          </>
        )}
      </Box>
    </CheckboxContainer>
  );
};
