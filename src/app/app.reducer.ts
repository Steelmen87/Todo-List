import { AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { todolistsThunks } from "../features/TodolistsList/model/todolists/todolists.reducer";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isRejected,
        (state, action: AnyAction) => {
          state.status = 'failed'
          if (action.payload) {
            // 1 variant
            if (action.type === "todo/addTodolist/rejected") return;
            // 2 variant
            // if (action.type.includes("addTodolist")) return;
            state.error = action.payload.messages[0]
          } else {
            state.error = action.error.message ? action.error.message : 'Some error occurred'
          }
        }
      )
  }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
