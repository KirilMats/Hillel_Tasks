import {configureStore} from "@reduxjs/toolkit";
import {todos} from "./reducers/todo/slice";

const store = configureStore({
    reducer: {
        todos: todos
    }
})

export default store;