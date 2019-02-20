import React from "react";
import ReactDOM from "react-dom";
import UserList from "./components/UserList";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import './index.css';
import * as serviceWorker from './serviceWorker';



const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

function App() {
    return (
        <div className="App">
            <UserList />
        </div>
    );
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
