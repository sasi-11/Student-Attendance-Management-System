import * as urls from "../../urls";

export const ROLES_RESULT = "ROLES_RESULT";
export const LOGIN_RESULT = "LOGIN_RESULT";
export const STUDENTS_RESULT = "STUDENTS_RESULT";
export const FACULTIES_RESULT = "FACULTIES_RESULT";
export const SUBJECTS_RESULT = "SUBJECTS_RESULT";
export const DEPARTMENTS_RESULT = "DEPARTMENTS_RESULT";
export const STUDENT_DETAIL_RESULT = "STUDENT_DETAIL_RESULT";
export const FACULTY_DETAIL_RESULT = "FACULTY_DETAIL_RESULT";
export const FACULTY_SUBJECT_DETAIL_RESULT = "FACULTY_SUBJECT_DETAIL_RESULT";

export const getRoles = () => {
	return async (dispatch) => {
		try {
			await fetch(urls.roles, {
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error(response.msg);
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					dispatch({
						type: ROLES_RESULT,
						data: data,
					});
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const login = (user) => {
	return async (dispatch) => {
		try {
			await fetch(urls.login, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...user }),
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Invalid username/password");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					localStorage.setItem("userID", data.loginUserID);
					dispatch({
						type: LOGIN_RESULT,
						data: data.loginUserID,
					});
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const getStudents = () => {
	return async (dispatch) => {
		try {
			await fetch(urls.students, {
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't fetch students");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					dispatch({
						type: STUDENTS_RESULT,
						data: data,
					});
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const createStudent = (student) => {
	return async (dispatch) => {
		try {
			await fetch(urls.students, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...student }),
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't add student");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					console.log("Added student");
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const getFaculties = () => {
	return async (dispatch) => {
		try {
			await fetch(urls.faculties, {
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't fetch faculties");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					dispatch({
						type: FACULTIES_RESULT,
						data: data,
					});
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const getSubjects = () => {
	return async (dispatch) => {
		try {
			await fetch(urls.subjects, {
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't fetch subjects");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					dispatch({
						type: SUBJECTS_RESULT,
						data: data,
					});
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const getDepartments = () => {
	return async (dispatch) => {
		try {
			await fetch(urls.departments, {
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't fetch departments");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					dispatch({
						type: DEPARTMENTS_RESULT,
						data: data,
					});
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const createFaculty = (faculty) => {
	return async (dispatch) => {
		try {
			await fetch(urls.faculties, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...faculty }),
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't add faculty");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					console.log("Added faculty");
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const createSubject = (subject) => {
	return async (dispatch) => {
		try {
			await fetch(urls.subjects, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...subject }),
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't add subject");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					console.log("Added subject");
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const createDepartment = (dept) => {
	return async (dispatch) => {
		try {
			await fetch(urls.departments, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...dept }),
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't add department");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					console.log("Added department");
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const updateDepartment = (dept) => {
	return async (dispatch) => {
		try {
			await fetch(`${urls.departments + "/" + dept.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...dept }),
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't update department");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					console.log("Updated department");
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const updateSubject = (sub) => {
	return async (dispatch) => {
		try {
			await fetch(`${urls.subjects + "/" + sub.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...sub }),
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't update subject");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					console.log("Updated subject");
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const getStudentByUserID = () => {
	const userID = localStorage.getItem("userID");
	return async (dispatch) => {
		try {
			await fetch(`${urls.students + "/" + userID}`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't fetch student details");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					dispatch({
						type: STUDENT_DETAIL_RESULT,
						data: data,
					});
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const deleteDepartment = (id) => {
	return async (dispatch) => {
		try {
			await fetch(`${urls.departments + "/" + id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't delete department");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					console.log("Deleted department");
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const deleteSubject = (id) => {
	return async (dispatch) => {
		try {
			await fetch(`${urls.subjects + "/" + id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't delete subject");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					console.log("Deleted subject");
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const getFacultyByUserID = () => {
	const userID = localStorage.getItem("userID");
	return async (dispatch) => {
		try {
			await fetch(`${urls.faculties + "/" + userID}`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't fetch faculty details");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					dispatch({
						type: FACULTY_DETAIL_RESULT,
						data: data,
					});
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const getFacultySubjectDetails = (subjectID) => {
	return async (dispatch) => {
		try {
			await fetch(`${urls.faculties + "/subject/" + subjectID}`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't fetch faculty subject details");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					dispatch({
						type: FACULTY_SUBJECT_DETAIL_RESULT,
						data: data,
					});
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const updateAttendance = (att) => {
	return async (dispatch) => {
		try {
			await fetch(`${urls.attendance + "/" + att.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...att }),
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't update attendance");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					console.log("Updated attendance");
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const updateFaculty = (fac) => {
	return async (dispatch) => {
		try {
			await fetch(`${urls.faculties + "/" + fac.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...fac }),
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't update faculty");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					console.log("Updated faculty");
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const updateStudent = (stu) => {
	return async (dispatch) => {
		try {
			await fetch(`${urls.students + "/" + stu.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...stu }),
			})
				.then(
					(response) => {
						if (response.ok) {
							return response;
						} else {
							throw new Error("Can't update student");
						}
					},
					(error) => {
						throw new Error(error.message);
					},
				)
				.then((response) => response.json())
				.then((data) => {
					console.log("Updated student");
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};
