import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import todoListApi from "../../api/todoListApi";

const todoListSlice = createSlice({
  name: "todoList",
  initialState: {
    status: "idle",
    todoList: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleStatusTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state[index].completed = !state[index].completed;
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodoList.fulfilled, (state, action) => {
        state.status = "success";
        state.todoList = action.payload;
      })
      .addCase(addNewTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.status = "success";
        state.todoList.push(action.payload);
      })
      .addCase(removeTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.todoList.findIndex(
          (todo) => todo.id === action.payload
        );
        state.todoList.splice(index, 1);
      })
      .addCase(toggleStatus.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.todoList.findIndex(
          (todo) => todo.id === action.payload
        );
        console.log(state.todoList[index]);
        state.todoList[index].completed = !state.todoList[index].completed;
      });
  },
});

export const fetchTodoList = createAsyncThunk(
  "todoList/fetchTodoList",
  async () => {
    const res = await todoListApi.getTodoList();
    return res;
  }
);

export const addNewTodo = createAsyncThunk(
  "todoList/addNewTodo",
  async (todo) => {
    const res = await todoListApi.createTodo(todo);
    return res;
  }
);

export const removeTodo = createAsyncThunk(
  "todoList/removeTodo",
  async (id) => {
    const res = await todoListApi.deleteTodo(id);
    if (res) {
      return id;
    }
  }
);

export const toggleStatus = createAsyncThunk(
  "todoList/toggleStatus",
  async ({ id, completed }) => {
    const data = {
      id: id,
      dataUpdate: { completed: completed },
    };

    const res = await todoListApi.updateTodo(data);
    if (res) {
      return id;
    }
  }
);

export default todoListSlice;
