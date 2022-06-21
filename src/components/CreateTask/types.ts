import { SetStateAction } from "react";
import { Task } from "../Tasks/type";

export type CreateTaskProps = {
  handleClose: () => void;
  allTasks: Task[];
  setTask: React.Dispatch<SetStateAction<Task[]>>;
};
