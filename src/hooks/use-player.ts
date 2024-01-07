import { randomShape, SHAPES } from "../shapes";
import { useCallback, useState } from "react";
import { checkCollision, STAGE_WIDTH, StageArrType } from "../game-helpers";

export type PlayerType = {
  pos: { x: number; y: number };
  shape: (number | string)[][];
  collided: boolean;
};

type UpdatePlayerPosParams = {
  x: number;
  y: number;
  collided: boolean;
};

export const usePlayer = (): [
  PlayerType,
  ({ x, y, collided }: UpdatePlayerPosParams) => void,
  () => void,
  (stage: StageArrType, dir: number) => void,
] => {
  const [player, setPlayer] = useState<PlayerType>({
    pos: { x: 0, y: 0 },
    shape: SHAPES[0].shape,
    collided: false,
  });

  const rotate = (matrix: (string | number)[][], dir: number) => {
    const rotatedShape = matrix.map((_, index) => matrix.map((col) => col[index]));
    if (dir > 0) {
      return rotatedShape.map((row) => row.reverse());
    }
  };

  const playerRotate = (stage: StageArrType, dir: number) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.shape = rotate(clonedPlayer.shape, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.shape[0].length) {
        rotate(clonedPlayer.shape, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }: UpdatePlayerPosParams) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      shape: randomShape().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
