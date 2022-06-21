import { SetStateAction } from "react";

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export type TaskProps = {

  tasks: Task[];
  setTasks: React.Dispatch<SetStateAction<Task[]>>

}

export type Task = {
  id?: string;
  title: string;
  description: string;
  date: Date;
  sequence: number;
  //tags: string[];
  status: TaskStatus;
};
