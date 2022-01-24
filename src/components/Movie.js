import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Card, Modal } from "react-bootstrap"
import invokeApi from "../apiCall"
import { BaseContext } from "../App"
import Loading from "./Loading"
import CategoriesList from "./CategoriesList"
import {
	Stack,
	Rating,
	Divider,
	Button,
	TextField,
	IconButton,
	InputAdornment,
} from "@mui/material"
import StarOutlineSharpIcon from "@mui/icons-material/StarOutlineSharp"
import SendIcon from "@mui/icons-material/Send"

const Movie = () => {
	const [movie, setMovie] = useState({
		rating: 0,
		CATEGORIES: [],
		reviews: [],
		ratings: [],
	})
	const [showRatingModal, setShowRatingModal] = useState(false)
	const [inputRating, setInputRating] = useState(0)
	const [inputReview, setInputReview] = useState("")
	let { movieId } = useParams()
	const { isLoading, setIsLoading, toast, setToast, isLoggedIn, authResponse } =
		useContext(BaseContext)

	useEffect(() => {
		getCurrentMovie()
	}, [])

	const getCurrentMovie = () => {
		setIsLoading(true)
		invokeApi(
			{ method: "GET", url: `api/movies/${movieId}` },
			(res, status) => {
				if (status) {
					res.rating = Math.round(res.rating * 10) / 10
					res.reviews.reverse()
					setMovie(res)
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

	const handleRateClick = () => {
		isLoggedIn
			? setShowRatingModal(true)
			: setToast({
					...toast,
					visible: true,
					message: "Login first to Rate Movie",
					type: "warning",
			  })
	}

	const submitRating = () => {
		invokeApi(
			{
				method: "POST",
				url: `api/ratings/`,
				data: {
					Count: inputRating,
					MOVIE: movie.id,
					USER: authResponse.user.id,
				},
			},
			(res, status) => {
				if (status) {
					setToast({
						...toast,
						visible: true,
						message: `You rated ${movie.NAME} ${inputRating} Stars`,
						type: "success",
					})
					setInputRating(0)
					setShowRatingModal(false)
					getCurrentMovie()
				} else {
					setToast({
						...toast,
						visible: true,
						message: "Something went wrong..! Please refresh the page...",
						type: "failure",
					})
				}
			}
		)
	}

	const submitReview = () => {
		!isLoggedIn
			? setToast({
					...toast,
					visible: true,
					message: "Login first to Submit a Review",
					type: "warning",
			  })
			: invokeApi(
					{
						method: "POST",
						url: `api/reviews/`,
						data: {
							Review: inputReview,
							MOVIE: movie.id,
							USER: authResponse.user.id,
						},
					},
					(res, status) => {
						if (status) {
							setToast({
								...toast,
								visible: true,
								message: `Your Review is Saved Successfully`,
								type: "success",
							})
							setInputReview("")
							getCurrentMovie()
						} else {
							setToast({
								...toast,
								visible: true,
								message: "Something went wrong..! Please refresh the page...",
								type: "failure",
							})
						}
					}
			  )
	}

	const renderRateModal = () => (
		<Modal
			show={showRatingModal}
			onHide={() => setShowRatingModal(false)}
			size="sm"
			aria-labelledby="star-rating-modal"
			backdrop="static"
			keyboard={false}
			centered
			className="text-dark"
		>
			<Modal.Header closeButton>
				<Modal.Title id="star-rating-modal">Rate</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ textAlign: "center" }}>
				<Rating
					name="input-rating"
					value={inputRating}
					onChange={(e, newValue) => {
						setInputRating(newValue)
					}}
				/>
				<br />
				<Button
					variant="contained"
					className="mt-3"
					size="small"
					onClick={submitRating}
				>
					Submit
				</Button>
			</Modal.Body>
		</Modal>
	)

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<CategoriesList categories={movie.CATEGORIES} />
					<Stack
						direction="row"
						justifyContent="space-between"
						className="my-3"
						spacing={2}
					>
						<Stack direction="column">
							<h2>{movie.NAME}</h2>
							<Stack direction="row" spacing={1}>
								<span>{movie.rating}</span>
								<Rating
									name="movie-rating"
									value={movie.rating}
									precision={0.1}
									emptyIcon={
										<StarOutlineSharpIcon
											style={{ opacity: 1 }}
											color="star"
											fontSize="inherit"
										/>
									}
									readOnly
								/>
							</Stack>
							<br />
							<Button
								variant="outlined"
								color="secondary"
								startIcon={<StarOutlineSharpIcon />}
								style={{ width: "fit-content" }}
								onClick={handleRateClick}
							>
								Rate
							</Button>
						</Stack>
						<Card className="p-2" style={{ width: "18rem" }}>
							<Card.Img variant="top" src={movie.COVER} />
						</Card>
					</Stack>
					<Divider />
					<div className="my-3">
						Cast: {movie.CAST} <br />
						<p className="text-muted">{movie.DESCRIPTION}</p>
					</div>
					<Divider />
					<div className="my-3">
						<h5>Reviews</h5>
						<TextField
							label="Write Your Review"
							variant="outlined"
							color="secondary"
							multiline
							fullWidth
							value={inputReview}
							onChange={e => setInputReview(e.target.value)}
							error
							required
							helperText={
								isLoggedIn
									? ""
									: "Make sure you are logged in before writing review"
							}
							InputProps={{
								style: { color: "white" },
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="send-review"
											size="small"
											color="secondary"
											edge="end"
											onClick={submitReview}
										>
											{inputReview.length > 0 && <SendIcon />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						{movie.reviews.map((item, index) => (
							<div className="mt-3" key={index}>
								<Divider />
								<p>
									<strong>{item.USER}</strong>
									<br />
									{item.Review}
								</p>
							</div>
						))}
					</div>
				</>
			)}
			{renderRateModal()}
		</>
	)
}

export default Movie

//    Use the following to prevent multiple rating on a movie by same user:
//    authResponse.user.id in movie.ratings.map(item => item.USER) ?
// 	  setToast({
// 			...toast,
// 			visible: true,
// 			message: "You have already rated this movie",
// 			type: "warning",
// 	  }):
