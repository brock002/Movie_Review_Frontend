import { useContext } from 'react'
import { BaseContext } from '../App'
import MovieCards from './MovieCards'
import CategoriesList from './CategoriesList'
import Loading from './Loading'
import HomeCarousel from './HomeCarousel'

const Home = () => {
	const { categories, movies, isLoading } = useContext(BaseContext)

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<CategoriesList categories={categories} />
					<HomeCarousel />
					<div className='my-3'></div>
					<MovieCards movies={movies} />
				</>
			)}
		</>
	)
}

export default Home
