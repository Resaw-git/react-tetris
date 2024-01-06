import { FC } from "react";
import styles from "./cell.module.css";
import { SHAPES } from "../../shapes";

type CellProps = {
  type: string | number;
};

export const Cell: FC<CellProps> = ({ type }) => {
  return (
    <div
      className={styles.cell}
      style={{
        background: `rgba(${SHAPES[type].color}, 0.8)`,
        border: `${type === 0 ? "0px solid" : "4px solid"}`,
        borderBottomColor: `rgba(${SHAPES[type].color}, 0.1)`,
        borderRightColor: `rgba(${SHAPES[type].color}, 1)`,
        borderTopColor: `rgba(${SHAPES[type].color}, 1)`,
        borderLeftColor: `rgba(${SHAPES[type].color}, 0.3)`,
      }}
    />
  );
};
