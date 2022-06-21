import { stylesheet, style } from "typestyle";
import { TaskStatus } from "../NavBar/type";

export const styles = stylesheet({
  Task_Card: {
    marginBottom: "20px",
    backgroundColor: "#89A0FF",
    height: "12vh",
    borderRadius: "20px",
  },
});

export const TaskCard_Title = (status: TaskStatus) =>
  style({
    textDecoration: status === "DONE" ? "line-through" : undefined,
    color: "white",
  });
