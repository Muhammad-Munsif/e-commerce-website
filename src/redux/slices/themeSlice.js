import { createSlice } from "@reduxjs/toolkit";

const loadThemeFromStorage = () => {
  try {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  } catch (error) {
    console.error("Error loading theme from storage:", error);
    return "light";
  }
};

const initialState = {
  mode: loadThemeFromStorage(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
      document.documentElement.classList.toggle("dark");
    },

    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
      document.documentElement.classList.toggle(
        "dark",
        action.payload === "dark"
      );
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme.mode;

export default themeSlice.reducer;
