import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getRoles, login } from "../../../redux/actions/userAction";

const Login = () => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [role, setRole] = useState("");
	const [validated, setValidated] = useState(false);
	const [formValue, setFormValue] = useState({
		username: "",
		password: "",
		rollnumber: "",
		roleID: "",
	});
	const [error, setError] = useState("");

	const roles = useSelector((state) => state.user.roles);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();
		if (form.checkValidity() === true) {
			if (role.name === "Student") {
				setFormValue({ ...formValue, username: formValue.rollnumber });
			}
			let user = { ...formValue, roleID: role._id };
			dispatch(login(user))
				.then(() => {
					localStorage.setItem("isLoggedIn", true);
					localStorage.setItem("role", role.name);
					window.location.reload();
				})
				.catch((err) => {
					setError(err.message);
				});
		}

		setValidated(true);
	};

	const handleInputChange = (event) => {
		setError("");
		const target = event.target;
		var value = target.value;
		const name = target.name;
		setFormValue({ ...formValue, [name]: value });
	};

	const getRolesData = useCallback(async () => {
		setIsLoading(true);
		await dispatch(getRoles())
			.then(() => {
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
				setIsLoading(false);
			});
	}, [dispatch]);

	const setLoginPage = (role) => {
		setRole(role);
	};

	useEffect(() => {
		getRolesData();
	}, [getRolesData]);

	return (
		<div className="row h100" style={{ backgroundColor: "beige" }}>
			<div className="col-12 d-flex justify-content-center mt-5">
				<h1 style={{ color: "#233659", fontSize: "3.5rem" }}>
					Attendance Analysis System
				</h1>
			</div>
			<div className="col-12">
				<div className="row">
					{isLoading ? (
						"loading..."
					) : !role ? (
						roles.map((role, key) => {
							return (
								<div
									className="col-4"
									onClick={() => setLoginPage(role)}
									key={key}
								>
									<div className="vertical-align-center">
										<div className="d-flex justify-content-center align-items-center p-60">
											<div className="login-button-card p-60">{role.name}</div>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<>
							<div className="col-4"></div>
							<div className="col-4">
								<div className="login-card">
									<Button
										variant="light"
										onClick={() => {
											setRole("");
											setValidated(false);
										}}
									>
										<i className="fa fa-angle-double-left"></i>
										{"  Go Back"}
									</Button>
									<h3 className="mb-4 mt-4">Log in as {role.name}</h3>
									{error && (
										<Alert variant="danger">
											<i className="fa fa-exclamation-triangle"></i>
											{"  " + error}
										</Alert>
									)}
									<Form
										noValidate
										validated={validated}
										onSubmit={handleSubmit}
									>
										{role.name === "Student" ? (
											<Form.Group className="mb-3" controlId="formBasicEmail">
												<Form.Label>Roll Number</Form.Label>
												<Form.Control
													type="text"
													placeholder="Roll Number"
													required
													name="rollnumber"
													onChange={handleInputChange}
												/>
												<Form.Control.Feedback type="invalid">
													Please choose a rollnumber.
												</Form.Control.Feedback>
											</Form.Group>
										) : (
											<Form.Group className="mb-3" controlId="formBasicEmail">
												<Form.Label>Username</Form.Label>
												<Form.Control
													type="text"
													placeholder="Username"
													required
													name="username"
													onChange={handleInputChange}
												/>
												<Form.Control.Feedback type="invalid">
													Please choose a username.
												</Form.Control.Feedback>
											</Form.Group>
										)}

										<Form.Group className="mb-3" controlId="formBasicPassword">
											<Form.Label>Password</Form.Label>
											<Form.Control
												type="password"
												placeholder="Password"
												required
												name="password"
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Please choose a password.
											</Form.Control.Feedback>
										</Form.Group>
										<Button variant="primary" type="submit">
											Login
										</Button>
									</Form>
								</div>
							</div>
							<div className="col-4"></div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
