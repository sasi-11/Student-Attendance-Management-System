import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import "./App.css";
import Main from "./modules/routing/Main";
import userData from "./redux/reducers/userReducer";

function App() {
	const store = createStore(
		combineReducers({
			user: userData,
		}),
		applyMiddleware(thunk),
	);
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Main />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
