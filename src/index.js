import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import reportWebVitals from "./reportWebVitals"

const theme = createTheme({
	palette: {
		type: "dark",
		secondary: {
			main: "#ff0000",
			contrastText: "#000",
		},
		star: {
			main: "#faaf00",
			contrastText: "#000",
		},
		white: {
			main: "#fff",
			contrastText: "#000",
		},
	},
})

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
)

reportWebVitals()
