import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Typography } from "../Typography";

interface CheckboxProps {
  checked?: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  backgroundColor?: string;
  borderColor?: string;
  height?: number;
  width?: number;
}

const greenText = css({
  color: "#38654a",
});

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

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  setChecked,
  backgroundColor,
  borderColor,
  height,
  width,
}: CheckboxProps) => {
  return (
    <CheckboxContainer>
      <Input type="checkbox" onChange={() => setChecked(!checked)} />
      <Box
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        height={height}
        width={width}
      >
        {checked && (
          <path
            d="M22.9 3.7l-15.2 16.6-6.6-7.1"
            strokeWidth="2"
            stroke="#38654a"
          />
        )}
      </Box>
      <Typography variant="body3" css={greenText}>
        AUTOMATICALLY SUBMIT
      </Typography>
    </CheckboxContainer>
  );
};
