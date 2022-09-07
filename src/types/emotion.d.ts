import "@emotion/react";
import { Palette, Typography } from "./theme";

declare module "@emotion/react" {
  export interface Theme {
    patelle: Palette;
    typography: Typography;
  }
}
