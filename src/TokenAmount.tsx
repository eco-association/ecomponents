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
      ...props
    }: TokenAmountProps,
    ref
  ) => {
    const [int, dec] = formatTokenAmount(amount);
    return (
      <Typography ref={ref} variant={intVariant} {...props}>
        {int}
        <Decimals
          inline
          variant={decVariant}
          options={decimalOptions}
          {...props}
        >
          .{dec}
        </Decimals>
      </Typography>
    );
  }
);
