import axiosClient from "./axiosClient";

const todoListApi = {
  getTodoList: (params) => {
    const url = "/todoApp";
    return axiosClient.get(url, { params });
  },
  getTodo: (id) => {
    const url = `/todoApp/${id}`;
    return axiosClient.get(url);
  },
  createTodo: (data) => {
    const url = "/todoApp";
    return axiosClient.post(url, data);
  },
  updateTodo: (data) => {
    const voteUpdate = data.dataUpdate;
    console.log(voteUpdate)
    const url = `/todoApp/${data.id}`;
    return axiosClient.put(url, data.dataUpdate);
  },
  deleteTodo: (id) => {
    const url = `/todoApp/${id}`;
    return axiosClient.delete(url);
  },
};


export default todoListApi;