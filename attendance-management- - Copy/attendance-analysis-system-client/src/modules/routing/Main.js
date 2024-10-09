import React from "react";
import { Button } from "react-bootstrap";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { isLoggedIn } from "../../services/authService";
import Admin from "../admin/Admin";
import Faculties from "../admin/Faculties";
import Students from "../admin/Students";
import Login from "../auth/pages/Login";
import Unauthorized from "../auth/pages/Unauthorized";
import Faculty from "../faculty/pages/Faculty";
import Student from "../student/pages/Student";
import RoleBasedRouting from "./components/RoleBasedRouting";

const MainContainer = (props) => {
	const logout = () => {
		localStorage.clear();
		window.location.reload();
	};
	return (
		<div>
			<header style={{ backgroundColor: "beige" }}>
				<div className="col-12 position-relative">
					<Button
						variant="danger"
						className="m-2 btn-position"
						size="sm"
						onClick={logout}
					>
						Logout
					</Button>
				</div>
			</header>
			{props.component}
		</div>
	);
};

const Main = () => {
	const role = localStorage.getItem("role");

	const StudentsPage = () => {
		return <MainContainer component={<Students />} />;
	};
	const AdminPage = () => {
		return <MainContainer component={<Admin />} />;
	};
	const FacultiesPage = () => {
		return <MainContainer component={<Faculties />} />;
	};
	const StudentPage = () => {
		return <MainContainer component={<Student />} />;
	};
	const FacultyPage = () => {
		return <MainContainer component={<Faculty />} />;
	};
	return (
		<Switch>
			<RoleBasedRouting
				exact
				path="/student"
				component={StudentPage}
				roles={["Student"]}
			/>
			<RoleBasedRouting
				exact
				path="/admin"
				component={AdminPage}
				roles={["Admin"]}
			/>
			<RoleBasedRouting
				exact
				path="/students"
				component={StudentsPage}
				roles={["Admin"]}
			/>
			<RoleBasedRouting
				exact
				path="/faculties"
				component={FacultiesPage}
				roles={["Admin"]}
			/>
			<RoleBasedRouting
				exact
				path="/faculty"
				component={FacultyPage}
				roles={["Faculty"]}
			/>
			{/* <Route path="/admin" component={Admin} exact /> */}
			{!isLoggedIn() && <Route path="/login" component={Login} exact />}
			<Route path="/unauthorized" component={Unauthorized} exact />
			<Redirect
				to={
					isLoggedIn()
						? role === "Student"
							? "student"
							: role === "Admin"
							? "admin"
							: "faculty"
						: "login"
				}
			/>
		</Switch>
	);
};

export default withRouter(Main);
