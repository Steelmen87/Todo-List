import React from "react";
import { Task } from "./Task/Task";
import { TodolistDomainType } from "../../model/todolists/todolists.reducer";
import { TaskType } from "../../api";
import { TaskStatuses } from "../../../../common/enums";

type Props = {
  tasks: TaskType[]
  todolist: TodolistDomainType
}
export const Tasks = ({ todolist, tasks }: Props) => {

  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  return (
    <>
      {tasksForTodolist.map((t) => (
        <Task
          key={t.id}
          task={t}
          todolistId={todolist.id}
        />
      ))}
    </>
  );
};