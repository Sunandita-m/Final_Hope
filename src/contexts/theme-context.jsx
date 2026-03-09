"use client";

import * as React from "react";

const themes = {
  purple: {
    primary: "99, 102, 241", // indigo-500
    secondary: "139, 92, 246", // violet-500
    accent: "168, 85, 247", // purple-500
    name: "Purple"
  },
  blue: {
    primary: "59, 130, 246", // blue-500
    secondary: "14, 165, 233", // sky-500
    accent: "6, 182, 212", // cyan-500
    name: "Blue"
  },
  green: {
    primary: "34, 197, 94", // green-500
    secondary: "16, 185, 129", // emerald-500
    accent: "20, 184, 166", // teal-500
    name: "Green"
  },
  pink: {
    primary: "236, 72, 153", // pink-500
    secondary: "244, 114, 182", // pink-400
    accent: "219, 39, 119", // pink-600
    name: "Pink"
  },
  orange: {
    primary: "249, 115, 22", // orange-500
    secondary: "251, 146, 60", // orange-400
    accent: "234, 88, 12", // orange-600
    name: "Orange"
  },
  teal: {
    primary: "20, 184, 166", // teal-500
    secondary: "6, 182, 212", // cyan-500
    accent: "14, 165, 233", // sky-500
    name: "Teal"
  }
};

const ThemeContext = React.createContext({
  theme: "purple",
  setTheme: () => {},
  colors: themes.purple,
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = React.useState("purple");

  React.useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme);
    }
  }, []);

  React.useEffect(() => {
    // Apply theme colors to CSS variables
    const colors = themes[theme];
    document.documentElement.style.setProperty("--color-primary", colors.primary);
    document.documentElement.style.setProperty("--color-secondary", colors.secondary);
    document.documentElement.style.setProperty("--color-accent", colors.accent);
  }, [theme]);

  const setTheme = (newTheme) => {
    if (themes[newTheme]) {
      setThemeState(newTheme);
      localStorage.setItem("app-theme", newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themes[theme], themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
