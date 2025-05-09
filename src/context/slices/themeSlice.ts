import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface ThemeColors {
  text: string;
  background: string;
  nav: string;
  frame: string;
  primary: string;
  secondary: string;
}

interface ThemeState {
  theme: Theme;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
}

const initialState: ThemeState = {
  theme: "dark",
  colors: {
    light: {
      text: "#2B2B2B",
      background: "#F6F6F6",
      nav: "#90DDF0",
      frame: "#D9F0FF",
      primary: "#CBF3F0",
      secondary: "#0D1321",
    },
    dark: {
      text: "#FEF9FF",
      background: "#502F4C",
      nav: "#2F6690",
      frame: "#5D717E",
      primary: "#454955",
      secondary: "#CBF3F0",
    },
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setCustomColor(state, action: PayloadAction<ThemeColors>) {
      if (state.theme === "light") state.colors.light = action.payload;
      else state.colors.dark = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, setCustomColor } = themeSlice.actions;
export default themeSlice.reducer;
