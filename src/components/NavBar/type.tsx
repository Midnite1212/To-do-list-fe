import { SetStateAction } from "react";
import { Task } from "../Tasks/type";

export type NavBarProps = {
  allTasks: Task[];
  setTask: React.Dispatch<SetStateAction<Task[]>>;
};

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

