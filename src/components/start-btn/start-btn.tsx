import { FC } from "react";
import styles from "./start-btn.module.css";

type StartBtnProps = {
  callback: () => void;
};
export const StartBtn: FC<StartBtnProps> = ({ callback }) => {
  return (
    <button className={styles.btn} onClick={callback}>
      Start Game
    </button>
  );
};
