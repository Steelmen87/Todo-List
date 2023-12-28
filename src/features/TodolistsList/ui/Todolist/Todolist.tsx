import React, { useCallback, useEffect } from "react";
import { TodolistDomainType } from "features/TodolistsList/model/todolists/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.reducer";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { TaskType } from "../../api";
import { FilterTasksButtons } from "../Tasks/FilterTasksButtons";
import { Tasks } from "../Tasks/Tasks";
import { Title } from "../Tasks/Title";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(function(props: PropsType) {
  const { fetchTasks, addTask: addTasksTC } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(props.todolist.id);
  }, [props.todolist.id,fetchTasks]);

  const addTask = useCallback(
    (title: string) => {
     return addTasksTC({ title, todolistId: props.todolist.id }).unwrap();
    },
    [props.todolist.id]
  );

  return (
    <div>
      <Title todolist={props.todolist} />
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"} />
      <div>
        <Tasks tasks={props.tasks} todolist={props.todolist} />
      </div>
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={props.todolist} />
      </div>
    </div>
  );
});
