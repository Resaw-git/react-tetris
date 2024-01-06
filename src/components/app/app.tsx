import { Display } from "../display/display";
import { StartBtn } from "../start-btn/start-btn";
import { Stage } from "../stage/stage";
import { createStage } from "../../game-helpers";
import styles from "./app.module.css";

export const App = () => {
  return (
    <div className={styles.tetris}>
      <Stage stage={createStage()} />
      <aside>
        <div>
          <Display gameOver={false} text={"SCORE"} />
          <Display gameOver={false} text={"ROWS"} />
          <Display gameOver={false} text={"LEVEL"} />
        </div>
        <StartBtn callback={"callback"} />
      </aside>
    </div>
  );
};
