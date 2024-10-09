import { retrieve } from "./storageService";

export const grantPermission = (accessibleRoles) => {
  const userRole = localStorage.getItem("role");
  debugger;
  return accessibleRoles.includes(userRole);
};

export const isLoggedIn = () => {
  const loggedIn = retrieve("isLoggedIn");
  return loggedIn;
};
