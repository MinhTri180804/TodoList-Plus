import { Button, Col, Input, Row, Select, Tag } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as idv4 } from "uuid";
import resultSelector from "../../redux/selector";
import Todo from "../Todo";
import todoListSlice, { addNewTodo } from "./todoListSlice";

export default function TodoList() {
  const dispatch = useDispatch();
  const [titleTodo, setTitleTodo] = useState("");
  const [priorityTodo, setPriorityTodo] = useState("Medium");
  const todoList = useSelector(resultSelector);
  const handleChangeTitle = (e) => {
    setTitleTodo(e.target.value);
  };

  const handleSelectPriority = (value) => {
    setPriorityTodo(value);
  };

  const handleAddTodo = () => {
    const todoAdd = {
      title: titleTodo,
      priority: priorityTodo,
      completed: false,
    };
    dispatch(addNewTodo(todoAdd));
    setTitleTodo("");
    setPriorityTodo("Medium");
  };
  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {todoList.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            priority={todo.priority}
            completed={todo.completed}
          />
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input onChange={handleChangeTitle} value={titleTodo} />
          <Select
            defaultValue="Medium"
            onChange={handleSelectPriority}
            value={priorityTodo}
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleAddTodo}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
