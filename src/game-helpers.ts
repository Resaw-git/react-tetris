import { PlayerType } from "./hooks/use-player";

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export type CellType = (number | string)[];
export type StageRowType = CellType[];
export type StageArrType = StageRowType[];

export const createStage = (): StageArrType =>
  Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, "clear"]));

export const checkCollision = (
  player: PlayerType,
  stage: StageArrType,
  { x: moveX, y: moveY }: { x: number; y: number },
) => {
  for (let y = 0; y < player.shape.length; y += 1) {
    for (let x = 0; x < player.shape[y].length; x += 1) {
      if (player.shape[y][x] !== 0) {
        if (
          !stage[y + player.pos.y + moveY] ||
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== "clear"
        ) {
          return true;
        }
      }
    }
  }
};
