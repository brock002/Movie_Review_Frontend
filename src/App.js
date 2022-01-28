import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import invokeApi from "./apiCall"
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

	useEffect(() => {
		getAllCategories()
		getAllMovies()
		checkSessionUser()
	}, [])

	const checkSessionUser = () => {
		let sessionUser = JSON.parse(sessionStorage.getItem("sessionUser"))
		if (sessionUser !== null) {
			setIsLoggedIn(true)
			setAuthResponse(sessionUser)
		}
	}

	const getAllCategories = () => {
		setIsLoading(true)
		invokeApi({ method: "GET", url: "api/categories/" }, (res, status) => {
			if (status) {
				setCategories(res)
			} else {
				setToast({
					...toast,
					visible: true,
					message: "Something went wrong..! Please refresh the page...",
					type: "failure",
				})
			}
			setIsLoading(false)
		})
	}

	const getAllMovies = () => {
		setIsLoading(true)
		invokeApi({ method: "GET", url: "api/movies/" }, (res, status) => {
			if (status) {
				setMovies([
					...res.map(item => {
						item.rating = Math.round(item.rating * 10) / 10
						return item
					}),
				])
			} else {
				setToast({
					...toast,
					visible: true,
					message: "Something went wrong..! Please refresh the page...",
					type: "failure",
				})
			}
			setIsLoading(false)
		})
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
