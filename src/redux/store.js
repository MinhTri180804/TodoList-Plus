import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "../components/Filters/filterSlice";
import todoListSlice from "../components/TodoList/todoListSlice";

const store = configureStore({
    reducer: {
        filter : filterSlice.reducer,
        todoList : todoListSlice.reducer
    }
})

export default store;