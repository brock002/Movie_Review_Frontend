import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { BaseContext } from "../App"
import invokeApi from "../apiCall"
import LoginSvg from "../assets/login.svg"
import RegistrationSvg from "../assets/register.svg"
import { Stack, Button, Divider } from "@mui/material"
import { Container, Image, Spinner } from "react-bootstrap"

const Login = () => {
	let navigate = useNavigate()
	const [isLoginActive, setIsLoginActive] = useState(true)
	const [loginForm, setLoginForm] = useState({ email: "", pass: "" })
	const [registrationForm, setRegistrationForm] = useState({
		email: "",
		fname: "",
		lname: "",
		pass1: "",
		pass2: "",
	})
	const {
		isLoading,
		setIsLoading,
		setIsLoggedIn,
		toast,
		setToast,
		setAuthResponse,
	} = useContext(BaseContext)

	// handle on change on forms
	const handleLoginFormChange = e =>
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value })

	const handleRegistrationFormChange = e =>
		setRegistrationForm({
			...registrationForm,
			[e.target.name]: e.target.value,
		})

	// handle login
	const login = e => {
		e.preventDefault()
		setIsLoading(true)
		invokeApi(
			{
				method: "POST",
				url: "rest-auth/login/",
				data: { email: loginForm.email, password: loginForm.pass },
			},
			(res, status) => {
				if (status) {
					setAuthResponse(res)
					setIsLoggedIn(true)
					setToast({
						...toast,
						visible: true,
						message: "You are now Logged In",
						type: "success",
					})
					sessionStorage.setItem("sessionUser", JSON.stringify(res))
					setLoginForm({ email: "", pass: "" })
					navigate(-1)
				} else if (
					res.non_field_errors[0] ===
					"Unable to log in with provided credentials."
				) {
					setToast({
						...toast,
						visible: true,
						message: "Email or Password is Incorrect. <br />Check Again.",
						type: "failure",
					})
				} else {
					setToast({
						...toast,
						visible: true,
						message: "Something went wrong..! Please try again...",
						type: "failure",
					})
				}
				setIsLoading(false)
			}
		)
	}

	// handle registration
	const register = e => {
		e.preventDefault()
		if (registrationForm.pass1 !== registrationForm.pass2) {
			setToast({
				...toast,
				visible: true,
				message: "Passwords Doesn't Match. <br />Check Again and Re-Submit.",
				type: "warning",
			})
		} else {
			setIsLoading(true)
			invokeApi(
				{
					method: "POST",
					url: "rest-auth/registration/",
					data: {
						email: registrationForm.email,
						first_name: registrationForm.fname,
						last_name: registrationForm.lname,
						password1: registrationForm.pass1,
						password2: registrationForm.pass2,
					},
				},
				(res, status) => {
					if (status) {
						setToast({
							...toast,
							visible: true,
							message:
								"You are now Registered. Login to start your journey with us.",
							type: "success",
						})
						setRegistrationForm({
							email: "",
							fname: "",
							lname: "",
							pass1: "",
							pass2: "",
						})
						setIsLoginActive(true)
					} else {
						res.email.length > 0
							? setToast({
									...toast,
									visible: true,
									message:
										"Email is already in Use. <br />Use a Different Email.",
									type: "failure",
							  })
							: setToast({
									...toast,
									visible: true,
									message: "Something went wrong..! Please try again...",
									type: "failure",
							  })
					}
					setIsLoading(false)
				}
			)
		}
	}

	// login form
	const renderLoginForm = () => (
		<Container>
			<Stack
				direction={{ xs: "column-reverse", xl: "row" }}
				justifyContent="space-between"
				divider={<Divider orientation="vertical" flexItem />}
				spacing={2}
			>
				<Image src={LoginSvg} className="login-img" fluid />
				<form className="form" onSubmit={login} className="fix-form-width">
					<Stack direction="column" spacing={2}>
						<h2>Sign In</h2>
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							type="email"
							name="email"
							placeholder="Email"
							className="form-input"
							value={loginForm.email}
							onChange={handleLoginFormChange}
							required
						/>
						<label htmlFor="pass" className="form-label">
							Password
						</label>
						<input
							type="password"
							name="pass"
							placeholder="Password"
							className="form-input"
							value={loginForm.pass}
							onChange={handleLoginFormChange}
							required
						/>
						<Button
							variant="outlined"
							type="submit"
							color="error"
							disabled={isLoading ? true : false}
						>
							{isLoading ? (
								<Spinner animation="border" variant="danger" size="sm" />
							) : (
								"Login"
							)}
						</Button>
						<p className="signup">
							Don't have an account ?
							<Button
								variant="text"
								color="secondary"
								onClick={() => setIsLoginActive(false)}
							>
								Sign Up
							</Button>
						</p>
					</Stack>
				</form>
			</Stack>
		</Container>
	)

	// registration form
	const renderRegistrationForm = () => (
		<Container>
			<Stack
				direction={{ xs: "column-reverse", xl: "row" }}
				justifyContent="space-between"
				divider={<Divider orientation="vertical" flexItem />}
				spacing={2}
			>
				<Image src={RegistrationSvg} className="login-img" fluid />
				<form className="form" onSubmit={register} className="fix-form-width">
					<Stack direction="column" spacing={2}>
						<h2 className="title">Create an account</h2>
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							type="email"
							name="email"
							placeholder="Email Address"
							className="form-input"
							value={registrationForm.email}
							onChange={handleRegistrationFormChange}
						/>
						<Stack
							direction={{ xs: "column", md: "row" }}
							justifyContent="space-between"
							spacing={2}
						>
							<div>
								<label htmlFor="fname" className="form-label">
									First Name
								</label>
								<input
									type="text"
									name="fname"
									placeholder="First Name"
									className="form-input"
									value={registrationForm.fname}
									onChange={handleRegistrationFormChange}
								/>
							</div>
							<div>
								<label htmlFor="lname" className="form-label">
									Last Name
								</label>
								<input
									type="text"
									name="lname"
									placeholder="Last Name"
									className="form-input"
									value={registrationForm.lname}
									onChange={handleRegistrationFormChange}
								/>
							</div>
						</Stack>
						<label htmlFor="pass1" className="form-label">
							Create Password
						</label>
						<input
							type="password"
							name="pass1"
							placeholder="Create Password (must be at least 8 character long)"
							className="form-input"
							value={registrationForm.pass1}
							minLength={8}
							onChange={handleRegistrationFormChange}
						/>
						<div className="text-muted">
							<li>password must be at least 8 character long</li>
						</div>
						<label htmlFor="pass2" className="form-label">
							Confirm Password
						</label>
						<input
							type="password"
							name="pass2"
							placeholder="Confirm Password (must be at least 8 character long)"
							className="form-input"
							value={registrationForm.pass2}
							minLength={8}
							onChange={handleRegistrationFormChange}
						/>
						<Button
							variant="outlined"
							type="submit"
							color="error"
							disabled={isLoading ? true : false}
						>
							{isLoading ? (
								<Spinner animation="border" variant="danger" size="sm" />
							) : (
								"Sign Up"
							)}
						</Button>
						<p className="signup">
							Already have an account ?
							<Button
								variant="text"
								color="secondary"
								onClick={() => setIsLoginActive(true)}
							>
								Sign In
							</Button>
						</p>
					</Stack>
				</form>
			</Stack>
		</Container>
	)

	return (
		<div className="login-div">
			{isLoginActive ? renderLoginForm() : renderRegistrationForm()}
		</div>
	)
}

export default Login
