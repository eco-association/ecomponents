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
  backgroundColor: rawBackgroundColor = "rgba(90, 228, 191, 0.2)",
  ...props
}: CheckboxProps) => {
  const theme = useTheme();
  const themeColor = theme.palette[rawColor as Color]?.main;
  const color = themeColor || rawColor;
  const backgroundColor =
    (themeColor && theme.palette[rawColor as Color]?.bgDark) ||
    rawBackgroundColor;
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
          <path
            d="M22.9 3.7l-15.2 16.6-6.6-7.1"
            strokeWidth="2"
            stroke={color}
          />
        )}
      </Box>
    </CheckboxContainer>
  );
};
