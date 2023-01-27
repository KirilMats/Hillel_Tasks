import {applyMiddleware, configureStore} from "@reduxjs/toolkit";
import {todos} from "./reducers/todo/slice";
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: {
        todos: todos
    }
}, applyMiddleware(thunk))

export default store;