import { stylesheet } from "typestyle";

export const styles = stylesheet({
  Modal_Container: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    background: "#EDEFEC",
    border: "2px solid #000",
    borderRadius: "37px",
    boxShadow: "192px",
    padding: "64px",
  },
});
