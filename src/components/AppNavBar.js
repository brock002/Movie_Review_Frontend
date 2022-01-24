import { useContext } from "react"
import { BaseContext } from "../App"
import { NavLink } from "react-router-dom"
import { Container, Nav, Navbar } from "react-bootstrap"

const AppNavBar = () => {
	const {
		isLoggedIn,
		setIsLoggedIn,
		authResponse,
		setAuthResponse,
		toast,
		setToast,
	} = useContext(BaseContext)

	const logout = () => {
		setAuthResponse({})
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
