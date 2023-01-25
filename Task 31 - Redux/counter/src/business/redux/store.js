import { configureStore } from "@reduxjs/toolkit";
import { counter } from './reducers/counter/slice';

const store = configureStore({
    reducer: {
        counter: counter
    }
})

export default store;