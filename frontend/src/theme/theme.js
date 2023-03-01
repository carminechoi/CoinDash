import { createTheme } from "@mui/material/styles";

// A custom theme for this app
export const themeLight = createTheme({
    palette: {
        background: {
            default: "#FAFCFF",
        },
        text: {
            primary: "#061431",
            secondary: "#627489",
        },
    },
});

export const themeDark = createTheme({});
