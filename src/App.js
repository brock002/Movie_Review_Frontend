import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import AppNavBar from "./components/AppNavBar"
import PopupToast from "./components/PopupToast"
import Login from "./components/Login"
import Home from "./components/Home"
import Movie from "./components/Movie"
import MoviesInCategory from "./components/MoviesInCategory"
import { Row, Container } from "react-bootstrap"

export const BaseContext = React.createContext()

function App() {
	const [isLoading, setIsLoading] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [authResponse, setAuthResponse] = useState({})
	// alert toast
	const [toast, setToast] = useState({
		message: "",
		visible: false,
		timeOut: 5000,
		type: "success",
	})
	const [categories, setCategories] = useState([])
	const [movies, setMovies] = useState([])

	// function to dismiss toast
	const hideToast = () => {
		setToast({ ...toast, visible: false })
	}

	return (
		<BaseContext.Provider
			value={{
				categories,
				setCategories,
				movies,
				setMovies,
				isLoading,
				setIsLoading,
				isLoggedIn,
				setIsLoggedIn,
				toast,
				setToast,
				authResponse,
				setAuthResponse,
			}}
		>
			<>
				<Row>
					<AppNavBar />
				</Row>
				<Container style={{ marginTop: "5rem" }}>
					<Routes>
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="movies/:movieId" element={<Movie />} />
						<Route
							path="category/:catID/movies"
							element={<MoviesInCategory />}
						/>
						<Route
							path="*"
							element={
								<h3 style={{ margin: "1rem" }}>
									Uh Oh!!! Something went Wrong!!!
								</h3>
							}
						/>
					</Routes>
				</Container>
				<PopupToast
					message={toast.message}
					visible={toast.visible}
					type={toast.type}
					timeOut={toast.timeOut}
					hideToast={hideToast}
				/>
			</>
		</BaseContext.Provider>
	)
}

export default App
