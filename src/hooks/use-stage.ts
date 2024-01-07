import { createStage, StageArrType } from "../game-helpers";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PlayerType } from "./use-player";

export const useStage = (
  player: PlayerType,
  resetPlayer: () => void,
): [StageArrType, Dispatch<SetStateAction<StageArrType>>, number] => {
  const [stage, setStage] = useState(createStage());
  const [rowCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage: (string | number)[][][]) =>
      newStage.reduce(
        (acc, row) => {
          if (row.findIndex((cell) => cell[0] === 0) === -1) {
            setRowsCleared((prev) => prev + 1);
            acc.unshift(new Array(newStage[0].length).fill([0, "clear"]) as (string | number)[][]);
            return acc;
          }

          acc.push(row);
          return acc;
        },
        [] as (string | number)[][][],
      );

    const updateStage = (prevStage: (string | number)[][][]) => {
      const newStage = prevStage.map((row) => row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell)));

      player.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [value, player.collided ? "merged" : "clear"];
          }
        });
      });

      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev: (string | number)[][][]) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowCleared];
};
