import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import invokeApi from "../apiCall"
import { BaseContext } from "../App"
import MovieCards from "./MovieCards"
import Loading from "./Loading"

const MoviesInCategory = () => {
	const [movies, setMovies] = useState([])
	const [category, setCategory] = useState({ id: "", NAME: "" })
	let { catID } = useParams()
	const { isLoading, setIsLoading, toast, setToast } = useContext(BaseContext)

	useEffect(() => {
		getCategory()
		getMovies()
	}, [])

	const getMovies = () => {
		setIsLoading(true)
		invokeApi(
			{ method: "GET", url: `api/categories/${catID}/movies` },
			(res, status) => {
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
			}
		)
	}

	const getCategory = () => {
		setIsLoading(true)
		invokeApi(
			{ method: "GET", url: `api/categories/${catID}` },
			(res, status) => {
				if (status) {
					setCategory(res)
				} else {
					setToast({
						...toast,
						visible: true,
						message: "Something went wrong..! Please refresh the page...",
						type: "failure",
					})
				}
				setIsLoading(false)
			}
		)
	}

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<h3>Popular "{category.NAME}" Movies</h3>
					<MovieCards movies={movies} />
				</>
			)}
		</>
	)
}

export default MoviesInCategory
