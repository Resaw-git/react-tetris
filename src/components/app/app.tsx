import styles from "./app.module.css";
import { Display } from "../display/display";
import { StartBtn } from "../start-btn/start-btn";
import { Stage } from "../stage/stage";
import { usePlayer } from "../../hooks/use-player";
import { useStage } from "../../hooks/use-stage";
import { useInterval } from "../../hooks/use-interval";
import { useGameStatus } from "../../hooks/use-game-status";
import { useState, KeyboardEvent } from "react";
import { checkCollision, createStage } from "../../game-helpers";

export const App = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  const movePlayer = (dir: number) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }

      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ key }: KeyboardEvent) => {
    if (!gameOver) {
      if (key === "ArrowDown") {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ key }: KeyboardEvent) => {
    if (!gameOver) {
      if (key === "ArrowLeft") {
        movePlayer(-1);
      } else if (key === "ArrowUp") {
        playerRotate(stage, 1);
      } else if (key === "ArrowRight") {
        movePlayer(1);
      } else if (key === "ArrowDown") {
        dropPlayer();
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <div className={styles.tetris} tabIndex={0} role={"button"} onKeyUp={keyUp} onKeyDown={move}>
      <Stage stage={stage} />
      <aside>
        {gameOver ? (
          <Display gameOver={gameOver} text={"Game Over"} />
        ) : (
          <div>
            <Display text={`Score: ${score}`} />
            <Display text={`Rows: ${rows}`} />
            <Display text={`Level: ${level}`} />
          </div>
        )}
        <StartBtn callback={startGame} />
      </aside>
    </div>
  );
};
