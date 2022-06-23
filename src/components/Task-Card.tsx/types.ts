import { SetStateAction } from "react";
import { Task } from "../Tasks/type";

export type TaskCardProps = {
  task: Task;
  allTask: Task[];
  index: number;
  setTask: React.Dispatch<SetStateAction<Task[]>>;
};
