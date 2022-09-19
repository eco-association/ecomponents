import "@emotion/react";
import { Theme as EcoTheme } from "./theme";

declare module "@emotion/react" {
  export interface Theme extends EcoTheme {}
}
