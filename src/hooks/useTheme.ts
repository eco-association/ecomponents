import { useTheme as useThemeEmotion } from "@emotion/react";
import { Theme } from "../types";

export const useTheme = useThemeEmotion as () => Theme;
