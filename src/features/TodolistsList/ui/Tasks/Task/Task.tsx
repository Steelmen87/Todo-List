import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { TaskType } from "../../../api";
import { useActions } from "common/hooks/useActions";
import { tasksThunks } from "../../../model/tasks/tasks.reducer";
import s from "../../../styles.module.css";

type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo(({ task, todolistId }: Props) => {
  const { removeTask, updateTask } = useActions(tasksThunks);
  const removeTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId: todolistId });
  };


  const changeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
      updateTask(
        {
          taskId:
          task.id,
          domainModel: { status },
          todolistId: todolistId
        }
      );
    },
    [task.id, todolistId]
  );

  const changeTitleHandler = useCallback(
    (title: string) => {
      updateTask({ taskId: task.id, domainModel: { title }, todolistId: todolistId });
    },
    [task.id, todolistId]
  );

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeStatusHandler} />

      <EditableSpan value={task.title} onChange={changeTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
