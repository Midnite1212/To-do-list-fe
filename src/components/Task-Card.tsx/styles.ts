import { stylesheet, style } from "typestyle";
import { TaskStatus } from "../NavBar/type";

export const styles = stylesheet({
  Task_Card: {
    marginBottom: "20px",
    height: "15vh",
    borderRadius: "20px",
    padding:"10px",
  },
});

export const TaskCard_Title = (status: TaskStatus) =>
  style({
    textDecoration: status === "DONE" ? "line-through" : undefined,
    color: "white",
  });
