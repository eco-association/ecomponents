import { Theme } from "@emotion/react";
import {Color} from "./theme";

export type PropsWithTheme<Props = {}> = Props & {
  theme?: Theme;
};

export interface CustomizableComponent {
  color?: Color;
}
