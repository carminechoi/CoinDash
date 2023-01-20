import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { themeLight } from "./theme";

export default function withRoot(Component) {
	function WithRoot(props) {
		return (
			<ThemeProvider theme={themeLight}>
				<CssBaseline />
				<Component {...props} />
			</ThemeProvider>
		);
	}

	return WithRoot;
}
