import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #3f51b5;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #2d3ebf;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

const TaskDescription = styled.span`
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: #f44336;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #e53935;
  }
`;

function TaskList() {
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (!newTaskDescription) {
      return;
    }

    const newTask = {
      id: Date.now(),
      description: newTaskDescription,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskDescription("");
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  const handleDeleteCompletedTasks = () => {
    const incompleteTasks = tasks.filter((task) => !task.completed);

    setTasks(incompleteTasks);
  };

  return (
    <Container>
      <h1>Task List</h1>

      <Input
        placeholder="Enter task description"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
      />

      <Button onClick={handleAddTask} disabled={!newTaskDescription}>
        Add Task
      </Button>

      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} completed={task.completed}>
            <TaskDescription>{task.description}</TaskDescription>

            <div>
              <Button onClick={() => handleCompleteTask(task.id)}>
                {task.completed ? "Incomplete" : "Complete"}
              </Button>

              <DeleteButton
                onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
              >
                Delete
              </DeleteButton>
            </div>
          </ListItem>
        ))}
      </List>

      <Button onClick={handleDeleteCompletedTasks}>
        Delete Completed Tasks
      </Button>
    </Container>
  );
}

export default TaskList;
