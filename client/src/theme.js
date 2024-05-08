// color design tokens
export const tokensDark = {
  grey: {
    0: "#e6e6e6", // White
    10: "#e1e1e1", // Light Grey
    50: "#d8d8d8", // Lighter Grey
    100: "#cfcfcf", // Even Lighter Grey
    200: "#c1c1c1",
    300: "#b2b2b2",
    400: "#a3a3a3",
    500: "#949494",
    600: "#868686",
    700: "#777777",
    800: "#686868",
    900: "#595959",
    1000: "#4a4a4a", // Black
  },
  primary: {
    // Dark Blue
    100: "#a8cbe0",
    200: "#77a8cc",
    300: "#4684b8",
    400: "#1361a4",
    500: "#00438e",
    600: "#003a76",
    700: "#002e5b",
    800: "#002142",
    900: "#001528",
  },
  secondary: {
    // Dark Yellow
    50: "#fdf5e1",
    100: "#f7e9c7",
    200: "#f0dda9",
    300: "#eace87",
    400: "#e1bd65",
    500: "#d8aa41",
    600: "#c98e26",
    700: "#b86f17",
    800: "#a8520e",
    900: "#953604",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  return Object.entries(tokensDark).reduce((reversedTokens, [key, val]) => {
    const reversedObj = Object.keys(val).reduce((obj, k, i, keys) => {
      obj[k] = val[keys[keys.length - i - 1]];
      return obj;
    }, {});
    reversedTokens[key] = reversedObj;
    return reversedTokens;
  }, {});
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
              box: tokensDark.grey[800], // Dark grey for box background in dark mode
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50],
              box: "#F0F0F0", // Light grey for box background in light mode
            },
          }),
    },
    typography: {
      fontFamily: "SamsungOne, Roboto, sans-serif",
      fontSize: 14,
      h1: { fontSize: 32 },
      h2: { fontSize: 28 },
      h3: { fontSize: 24 },
      h4: { fontSize: 20 },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
    },
  };
};
