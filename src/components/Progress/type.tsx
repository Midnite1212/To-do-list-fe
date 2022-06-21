import React, { SetStateAction } from "react";
import { Task } from "../Tasks/type";

export type ProgressProps = {
  data: Task[];
  setData: React.Dispatch<SetStateAction<Task[]>>
};
