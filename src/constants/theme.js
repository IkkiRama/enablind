import { useState } from "react";

const COLORS = {
  font: "#302f2f",

  primary: "#6A5AE0",
  secondary: "#1352ff",
  tertiary: "#FF7754",
  yellowCollor: "#ffc107",
  kategoriCOlor: "#2eb5c0",
  kostWanita: "#FF1F00",
  diskon: "#DA4549",
  merah: "#dc3545",

  btnHijau: "#1ee592",

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
  colorShadow: "rgba(0, 0, 0, 0.1)",

  borderColor: "#e4e4e7",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  small: 14,
  medium: 16,
  normal: 18,
  large: 21,
  xxLarge: 23,
};

const SHADOWS = {
  small: {
    shadowColor: COLORS.colorShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.colorShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  hard: {
    shadowColor: COLORS.colorShadow,
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

const SAFEAREAVIEW = {
  style: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
};

export { COLORS, FONT, SIZES, SHADOWS, SAFEAREAVIEW };
