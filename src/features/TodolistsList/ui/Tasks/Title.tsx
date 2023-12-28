import React, { useCallback } from "react";
import { EditableSpan } from "../../../../common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useActions } from "../../../../common/hooks";
import { TodolistDomainType, todolistsThunks } from "../../model/todolists/todolists.reducer";

type Props = {
  todolist: TodolistDomainType
}
export const Title = ({ todolist }: Props) => {

  const { removeTodolist: removeTodolistTC, changeTodolistTitle: changeTodolistTitleCT } = useActions(todolistsThunks);
  const removeTodolist = () => {
    removeTodolistTC(todolist.id);
  };

  const changeTodolistTitle = useCallback(
    (title: string) => {
      changeTodolistTitleCT({ id: todolist.id, title });
    },
    [todolist.id]
  );
  return (
    <>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
    </>
  );
};
