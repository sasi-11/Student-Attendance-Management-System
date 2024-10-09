import * as Types from "../actions/userAction";

const initialState = {
	roles: [],
	students: [],
	faculties: [],
	subjects: [],
	departments: [],
	studentDetails: null,
	facultyDetails: null,
	facultySubjectDetails: [],
};

const userData = (state = initialState, action) => {
	switch (action.type) {
		case Types.ROLES_RESULT:
			return { ...state, roles: action.data };
		case Types.STUDENTS_RESULT:
			return {
				...state,
				students: action.data,
			};
		case Types.FACULTIES_RESULT:
			return {
				...state,
				faculties: action.data,
			};
		case Types.SUBJECTS_RESULT:
			return {
				...state,
				subjects: action.data,
			};
		case Types.DEPARTMENTS_RESULT:
			return {
				...state,
				departments: action.data,
			};
		case Types.STUDENT_DETAIL_RESULT:
			return {
				...state,
				studentDetails: action.data,
			};
		case Types.FACULTY_DETAIL_RESULT:
			return {
				...state,
				facultyDetails: action.data,
			};
		case Types.FACULTY_SUBJECT_DETAIL_RESULT:
			return {
				...state,
				facultySubjectDetails: action.data,
			};
		default:
			return state;
	}
};

export default userData;
