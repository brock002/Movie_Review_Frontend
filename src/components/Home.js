import { useEffect, useContext } from "react"
import { BaseContext } from "../App"
import invokeApi from "../apiCall"
import MovieCards from "./MovieCards"
import CategoriesList from "./CategoriesList"
import Loading from "./Loading"

const Home = () => {
	const {
		categories,
		setCategories,
		movies,
		setMovies,
		isLoading,
		setIsLoading,
		toast,
		setToast,
	} = useContext(BaseContext)

	useEffect(() => {
		getAllCategories()
		getAllMovies()
	}, [])

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
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<CategoriesList categories={categories} />
					<div className="my-3"></div>
					<MovieCards movies={movies} />
				</>
			)}
		</>
	)
}

export default Home
