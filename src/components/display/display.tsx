import { FC } from "react";
import styles from "./display.module.css";

type DisplayProps = {
  gameOver: boolean;
  text: string;
};

export const Display: FC<DisplayProps> = ({ gameOver, text }) => {
  return (
    <div
      className={styles.display}
      style={{
        color: `${gameOver ? "red" : "#999"}`,
      }}
    >
      {gameOver}
      {text}
    </div>
  );
};
