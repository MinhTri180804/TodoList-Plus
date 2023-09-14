import { Button, Checkbox, Row, Tag } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTodo, toggleStatus } from "../TodoList/todoListSlice";

const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

export default function Todo({ id, title, priority, completed }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(completed);

  const toggleCheckbox = () => {
    setChecked(!checked);
    dispatch(toggleStatus({id: id, completed: !checked}));
  };

  const handleRemoveTodo = () => {
    dispatch(removeTodo(id));
  }

  return (
    <Row
      className="flex"
      justify="space-between"
      style={{
        marginBottom: 3,
        ...(checked ? { opacity: 0.5, textDecoration: "line-through" } : {}),
      }}
    >
      <Checkbox checked={checked} onChange={toggleCheckbox}>
        {title}
      </Checkbox>
      <div className="flex">
        <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
          {priority}
        </Tag>
        <Button type="primary" danger onClick={handleRemoveTodo
        
        }>
          Remove
        </Button>
      </div>
    </Row>
  );
}
