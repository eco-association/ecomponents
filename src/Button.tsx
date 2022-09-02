import styled, { css } from "styled-components/macro";

export const BaseButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 0.5em;
  color: currentColor;
  cursor: pointer;
  font-size: inherit;
  font-weight: inherit;
  height: inherit;
  line-height: inherit;
  margin: 0;
  padding: 0;
  :enabled {
    transition: filter 0.125s linear;
  }
  :disabled {
    cursor: initial;
    filter: opacity(0.4);
  }
`;
const transitionCss = css`
  transition: background-color 0.125s linear, border-color 0.125s linear,
    filter 0.125s linear;
`;

export const Button = styled(BaseButton)<{ transition?: boolean }>`
  background-color: green;
  border: 1px solid transparent;
  color: ${({ color = "interactive" }) =>
    color === "interactive" ? "green" : "blue"};
  :enabled {
    ${({ transition = true }) => transition && transitionCss};
  }
  :enabled:hover {
    background-color: green;
  }
`;
