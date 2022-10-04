import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Typography } from "../Typography";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  height?: number;
  width?: number;

  onChange?(checked: boolean): void;
}

const greenText = css({ color: "#38654a" });

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
  ({
    height = 16,
    width = 16,
    backgroundColor = "rgba(90, 228, 191, 0.2)",
    borderColor = "#38654a",
  }) => ({
    display: "inline-block",
    height,
    width,
    borderRadius: "2px",
    background: backgroundColor,
    border: `1px solid ${borderColor}`,
    marginRight: "6px",
  })
);

const CheckboxContainer = styled.label({
  display: "flex",
  flexDirection: "row",
  alignContent: "center",
  "&:hover": {
    cursor: "pointer",
  },
});

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  ...props
}: CheckboxProps) => {
  return (
    <CheckboxContainer>
      <Input type="checkbox" onChange={() => onChange && onChange(!checked)} />
      <Box aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
        {checked && (
          <path
            d="M22.9 3.7l-15.2 16.6-6.6-7.1"
            strokeWidth="2"
            stroke="#38654a"
          />
        )}
      </Box>
      <Typography variant="body3" css={greenText}>
        {label}
      </Typography>
    </CheckboxContainer>
  );
};
