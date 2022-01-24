import { Link } from "react-router-dom"
import { Card, Row } from "react-bootstrap"
import { Stack, Rating } from "@mui/material"

const MovieCards = ({ movies }) => {
	return (
		<>
			{movies.length > 0 ? (
				<Row>
					{movies.map((item, index) => (
						<Card key={index} className="m-3 pt-2 movie-card">
							<Card.Img variant="top" src={item.COVER} />
							<Card.Header className="movie-card-header">
								<Card.Link as={Link} to={`/movies/${item.id}`}>
									<h6>{item.NAME}</h6>
								</Card.Link>
							</Card.Header>
							<Card.Body style={{ padding: "1rem 0rem 1rem 0.5rem" }}>
								<Stack direction="row" spacing={1}>
									<span>{item.rating}</span>
									<Rating
										name="movie-rating"
										value={item.rating}
										precision={0.1}
										readOnly
									/>
								</Stack>
							</Card.Body>
						</Card>
					))}
				</Row>
			) : (
				<h4>No Movies Available</h4>
			)}
		</>
	)
}

export default MovieCards
