import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.
        fontSize: 14,
      },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#0c045c',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      
      main: '#0c045c',
      // dark: will be calculated from palette.secondary.main,
      
    },
    background: {
        main:'rgb(246,207,43)'
    },
    
    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    // (For TypeScript, you need to add module augmentation for the `custom` value)
    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: '"Poppins-semiBold", sans-serif',  // Or the font defined in your app.css
  },
  components: {
    MuiListItemText: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            fontFamily: 'Poppins-medium, sans-serif',
          },
        },
        primary: {
          fontFamily: 'Poppins-medium, sans-serif', // Apply the font to all ListItemText
        },
      },
    },
  },
});

export default theme