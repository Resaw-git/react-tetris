import { Cell } from "../cell/cell";
import { FC } from "react";
import styles from "./stage.module.css"

type StageProps = {
  stage: any[][];
};

export const Stage: FC<StageProps> = ({ stage }) => {
  const width = stage[0].length;
  const height = stage.length;

  return (
    <div className={styles.stage}
    style={{
      gridTemplateRows: `repeat(${height}, calc(25vw / ${width}))`,
      gridTemplateColumns: `repeat(${width}, 1fr)`,
    }}
    >
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} />),
      )}
    </div>
  );
};
