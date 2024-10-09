import React from "react";
import { Route, Redirect } from "react-router-dom";
import { grantPermission, isLoggedIn } from "../../../services/authService";

const RoleBasedRouting = ({ component: Component, roles, ...rest }) => {
	debugger;
	return (
		<>
			{!isLoggedIn() ? (
				<Redirect to="login" />
			) : grantPermission(roles) ? (
				<Route
					{...rest}
					render={(props) => (
						<>
							<Component {...props} />
						</>
					)}
				/>
			) : (
				<Redirect to="unauthorized" />
			)}
		</>
	);
};

export default RoleBasedRouting;
