export const store = (key, value) => {
	if (key && value) {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

export const retrieve = (key) => {
	let value;
	if (key) {
		value = localStorage.getItem(key);
	}
	if (value) {
		return JSON.parse(value);
	}
};
