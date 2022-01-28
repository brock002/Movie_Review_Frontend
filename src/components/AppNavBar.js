import { useContext } from "react"
import { BaseContext } from "../App"
import { NavLink, useNavigate } from "react-router-dom"
import { Container, Nav, Navbar } from "react-bootstrap"
import { Autocomplete, TextField } from "@mui/material"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"

const AppNavBar = () => {
	let navigate = useNavigate()
	const {
		categories,
		movies,
		isLoggedIn,
		setIsLoggedIn,
		authResponse,
		setAuthResponse,
		toast,
		setToast,
	} = useContext(BaseContext)

	const searchOptions = [
		...movies.map(item => ({ id: item.id, label: item.NAME, type: "Movie" })),
		...categories.map(item => ({
			id: item.id,
			label: `${item.NAME} Movies`,
			type: "Category",
		})),
	]

	const onSearch = val => {
		if (val !== null) {
			val.type === "Movie"
				? navigate(`/movies/${val.id}`)
				: navigate(`/category/${val.id}/movies`)
		}
	}

	const logout = () => {
		setAuthResponse({})
		window.sessionStorage.clear()
		setIsLoggedIn(false)
		setToast({
			...toast,
			visible: true,
			message: "You are now logged out!!!",
			type: "success",
		})
	}

	return (
		<Navbar collapseOnSelect expand="sm" bg="danger" variant="dark" fixed="top">
			<Container>
				<Navbar.Brand as={NavLink} to="/" className="navbar-button">
					Home
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="main-navbar" />
				<Navbar.Collapse id="main-navbar" className="justify-content-end">
					<Nav>
						<Autocomplete
							disablePortal
							selectOnFocus
							blurOnSelect
							clearOnBlur
							autoComplete
							autoSelect
							handleHomeEndKeys
							id="main-search"
							options={searchOptions}
							size="small"
							sx={{
								width: 300,
								mr: "2rem",
							}}
							onChange={(e, val) => onSearch(val)}
							renderInput={params => (
								<TextField
									{...params}
									variant="outlined"
									color="white"
									label={
										<>
											<SearchRoundedIcon />
											&nbsp; Search
										</>
									}
									InputProps={{
										...params.InputProps,
										sx: { borderRadius: 20 },
										style: { color: "white" },
									}}
								/>
							)}
							isOptionEqualToValue={(option, value) =>
								option.id === value.id && option.type === value.type
							}
						/>
						{isLoggedIn ? (
							<>
								<Nav.Link className="navbar-button mx-3" disabled>
									{`Welcome ${authResponse.user.first_name}`}
								</Nav.Link>
								<Nav.Link onClick={logout} className="navbar-button">
									Logout
								</Nav.Link>
							</>
						) : (
							<Nav.Link as={NavLink} to="login" className="navbar-button">
								Login
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default AppNavBar

// code to use in Autocomplete if you want to customize the options and render a link on click
// renderOption={(props, option) => (
// 	<Link
// 		{...props}
// 		key={`${option.type}_${option.id}`}
// 		to={
// 			option.type === "Movie"
// 				? `/movies/${option.id}`
// 				: `/category/${option.id}/movies`
// 		}
// 	>
// 		{option.label}
// 	</Link>
// )}
