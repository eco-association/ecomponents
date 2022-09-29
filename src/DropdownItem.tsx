import styled from "@emotion/styled";

interface DropdownItemProps {
  backgroundColor?: string;
  width?: string;
  height?: string;
  fontColor?: string;
  fontSize?: string;
}

export const DropdownItem = styled("li")<DropdownItemProps>(
  ({
    theme,
    backgroundColor = "#22313A",
    width = "119px",
    height = "29px",
    fontColor = "#FFFFFF",
    fontSize = "11px",
  }) => ({
    ...theme["typography"]["body3"],
    display: "flex",
    position: "relative",
    alignItems: "center",
    marginTop: "10px",
    backgroundColor,
    borderRadius: "4px",
    width,
    height,
    color: fontColor,
    fontSize,
    justifyContent: "center",
    "&:hover": {
      filter: "none",
    },
  })
);
