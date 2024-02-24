import React, { createContext, useReducer, PropsWithChildren } from "react";

export enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
}

type AppState = {
  tasks: Task[];
};

type AppContextValue = AppState & {
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
  updateTaskStatus: (id: string, status: Status) => void;
  findTask: (id: string) => Task | null;
};

const AppContext = createContext<AppContextValue | null>(null);

const initialState: AppState = {
  tasks: [],
};

enum Actions {
  AddTask = "ADD_TASK",
  RemoveTask = "REMOVE_TASK",
  UpdateTask = "UPDATE_TASK",
  UpdateTaskStatus = "UPDATE_TASK_STATUS",
}

type AddTaskAction = {
  type: "ADD_TASK";
  payload: Task;
};

type RemoveTaskAction = {
  type: "REMOVE_TASK";
  payload: string;
};

type UpdateTaskAction = {
  type: "UPDATE_TASK";
  payload: Task;
};

type UpdateTaskStatusAction = {
  type: Actions.UpdateTaskStatus;
  payload: {
    id: string;
    status: Status;
  };
};

type AppAction =
  | AddTaskAction
  | RemoveTaskAction
  | UpdateTaskAction
  | UpdateTaskStatusAction;

const appReducer = (state: AppState, action: AppAction): AppState => {
  if (action.type === "ADD_TASK") {
    return {
      ...state,
      tasks: [...state.tasks, action.payload],
    };
  }
  if (action.type === "REMOVE_TASK") {
    return {
      ...state,
      tasks: state.tasks.filter((task) => task.id !== action.payload),
    };
  }
  if (action.type === "UPDATE_TASK") {
    return {
      ...state,
      tasks: [
        ...state.tasks.filter((task) => task.id !== action.payload.id),
        action.payload,
      ],
    };
  }
  if (action.type === Actions.UpdateTaskStatus) {
    return {
      ...state,
      tasks: state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            status: action.payload.status,
          };
        }
        return task;
      }),
    };
  }

  return state;
};

export function useAppContext() {
  const appCtx = React.useContext(AppContext);
  if (!appCtx) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return appCtx;
}

type AppContextProviderProps = PropsWithChildren<{}>;

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [appState, dispatch] = useReducer(appReducer, initialState);

  const ctx = {
    tasks: appState.tasks,
    addTask: (task: Task) => {
      dispatch({ type: Actions.AddTask, payload: task });
    },
    removeTask: (id: string) => {
      dispatch({ type: Actions.RemoveTask, payload: id });
    },
    updateTask: (task: Task) => {
      dispatch({ type: Actions.UpdateTask, payload: task });
    },
    updateTaskStatus: (id: string, status: Status) => {
      dispatch({ type: Actions.UpdateTaskStatus, payload: { id, status } });
    },
    findTask: (id: string) => {
      const task = appState.tasks.find((task) => task.id === id);
      return task || null;
    },
  };

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}
