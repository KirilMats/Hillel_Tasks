import {createSlice} from "@reduxjs/toolkit";


const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [
            {
                id: crypto.randomUUID(),
                text: '123',
                isChecked: true,
                priority: 'low'
            },
            {
                id: crypto.randomUUID(),
                text: '243',
                isChecked: false,
                priority: 'medium'
            }
        ],
        newTodo: {
            text: '',
            isChecked: false,
            priority: 'low'
        }
    },
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload
        },
        setNewTodo: (state, action) => {
            state.newTodo = action.payload
        }
    }
})

export const {setTodos, setNewTodo} = todoSlice.actions;
export const todos = todoSlice.reducer;