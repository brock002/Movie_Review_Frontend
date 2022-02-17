import { Link } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import { Card, CardActionArea, CardMedia, CardContent } from '@mui/material'
import Carousel from 'react-elastic-carousel'

const movies = [
	{ movieId: 2, name: 'Spiderman No Way Home' },
	{ movieId: 13, name: 'Avatar' },
	{ movieId: 12, name: "Don't Look Up" },
	{ movieId: 5, name: 'The Shawshank Redemption' },
	{ movieId: 3, name: 'Inception' },
]

const HomeCarousel = () => {
	return (
		<Container className='my-5'>
			<h4>Trending Now</h4>
			<Row className='justify-content-center'>
				<Carousel
					itemsToScroll={1}
					focusOnSelect={true}
					itemsToShow={3}
					enableAutoPlay
					autoPlaySpeed={3000}
					itemPadding={[0, 5]}
				>
					{movies.map((item, index) => (
						<Card sx={{ width: 400 }}>
							<CardActionArea
								as={Link}
								to={`/movies/${item.movieId}`}
							>
								<CardMedia
									component='img'
									height='200'
									image={`https://brock002.pythonanywhere.com/static/${
										index + 1
									}.jpg`}
									alt={item.name}
								/>
								<CardContent
									style={{ backgroundColor: '#121212' }}
								>
									<h5>{item.name}</h5>
								</CardContent>
							</CardActionArea>
						</Card>
					))}
				</Carousel>
			</Row>
		</Container>
	)
}

export default HomeCarousel
