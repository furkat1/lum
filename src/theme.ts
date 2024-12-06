"use client";

import { alpha, createTheme } from "@mui/material/styles";

import { palette } from "./config/palette";

const theme = createTheme({
  cssVariables: true,
  defaultColorScheme: "dark",
  palette: {
    primary: {
      main: palette.primary_main,
    },
  },
  typography: {
    fontFamily: "var(--font-nunito)",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: palette.black,
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 4,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          height: 31,
          background: alpha(palette.dark_grey, 0.5),
          borderRadius: 6,
          "&:hover": {
            background: palette.dark_grey,
          },
          "&.Mui-disabled": {
            color: alpha(palette.white, 0.5),
            "&:hover": {
              background: alpha(palette.dark_grey, 0.5),
            },
          },

          "&.Mui-focused": {
            "#select-arrow-down": {
              fill: palette.primary_main,
            },
          },

          ".MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
        select: {
          padding: "8px 16px",
          minWidth: 100,
          lineHeight: "16px",
          minHeight: 16,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: 0,
          maxHeight: 400,
          overflowX: "hidden",
          overflowY: "auto",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          background: palette.bg_pink,
          color: palette.black,
          "&:hover": {
            background: palette.hover_pink_light,
          },
          "&.Mui-selected": {
            background: palette.primary_light,
          },
          "&.Mui-focusVisible": {
            background: alpha(palette.primary_main, 0.9),
          },
          "&.Mui-selected.Mui-focusVisible": {
            backgroundColor: alpha(palette.primary_main, 0.9),
          },
          "&.Mui-focused": {
            background: alpha(palette.primary_main, 0.9),
          },
        },
      },
    },
  },
});

export default theme;
