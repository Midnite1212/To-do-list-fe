import { SetStateAction } from "react";
import { Task } from "../Tasks/type";

export type DeleteTaskProps = {
  task: Task;
  allTasks: Task[];
  setTask: React.Dispatch<SetStateAction<Task[]>>;
  index: number;
  isOpen: boolean;
  onClose: () => void;
};
