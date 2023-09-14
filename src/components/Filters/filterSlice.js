import { createSlice } from "@reduxjs/toolkit";

const 
filterSlice = createSlice({
    name: 'filter',
    initialState: {
        search : '',
        status : 'All',
        priority : []
    },
    reducers: {
        searchFilter : (state, action) => {
            state.search = action.payload;
        },
        priorityFilter : (state, action) => {
            state.priority = action.payload;
        },
        statusFilter : (state, action) => {
            state.status = action.payload;
        }
    }
})

export default filterSlice;