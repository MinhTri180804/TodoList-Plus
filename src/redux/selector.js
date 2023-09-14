import { createSelector } from "@reduxjs/toolkit";

export const todoListSelector = (state) => state.todoList.todoList;
export const searchFilterSelector = (state) => state.filter.search;
export const statusFilterSelector = (state) => state.filter.status;
export const priorityFilterSelector = (state) => state.filter.priority;
const resultSelector = createSelector(
  todoListSelector,
  searchFilterSelector,
  statusFilterSelector,
  priorityFilterSelector,
  (todoList, searchFilter, statusFilter, priorityFilter) => {
    return todoList.filter((todo) => {
      if (statusFilter === "All") {
        return priorityFilter.length
          ? todo.title.toLowerCase().includes(searchFilter) &&
              priorityFilter.includes(todo.priority)
          : todo.title.toLowerCase().includes(searchFilter);
      }

      return priorityFilter.length
        ? todo.title.toLowerCase().includes(searchFilter) &&
          priorityFilter.includes(todo.priority) &&
          (statusFilter === "Completed"
          ? todo.completed
          : !todo.completed)
        : todo.title.toLowerCase().includes(searchFilter) &&
          (statusFilter === "Completed"
        ? todo.completed
        : !todo.completed
        )
    });
  }
);

export default resultSelector;
