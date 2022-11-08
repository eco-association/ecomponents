import React from "react";
import styled from "@emotion/styled";
import { Typography, TypographyProps } from "./Typography";
import { formatNumber } from "./utils";
import { BigNumber } from "@ethersproject/bignumber";
import { formatEther } from "@ethersproject/units";

interface DecimalOptions {
  lightWeight?: boolean;
}

interface TokenAmountProps extends Omit<TypographyProps, "variant"> {
  amount: BigNumber | string | number;
  decimalOptions?: DecimalOptions;
  intVariant?: TypographyProps["variant"];
  decVariant?: TypographyProps["variant"];
  decColor?: TypographyProps["color"];
}

function formatTokenAmount(amount: TokenAmountProps["amount"]) {
  if (typeof amount === "number") return formatNumber(amount).split(".");
  return formatNumber(formatEther(amount)).split(".");
}

const Decimals = styled(Typography)<{ options: DecimalOptions }>(
  ({ theme, options: { lightWeight } }) => ({
    ...(lightWeight ? { fontWeight: theme.typography.fontWeightRegular } : {}),
  })
);

export const TokenAmount = React.forwardRef<HTMLSpanElement, TokenAmountProps>(
  (
    {
      amount,
      decimalOptions = {},
      intVariant = "h2",
      decVariant = "h3",
      decColor,
      ...props
    }: TokenAmountProps,
    ref
  ) => {
    const [int, dec] = formatTokenAmount(amount);
    return (
      <Typography variant={intVariant} {...props} ref={ref}>
        {int}
        <Decimals
          inline
          variant={decVariant}
          options={decimalOptions}
          {...props}
          color={decColor || props.color}
        >
          .{dec}
        </Decimals>
      </Typography>
    );
  }
);
