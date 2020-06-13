import { startGame } from './game/lib';
import { askToSelectGame } from './select-game/lib';

async function startGameManagement() {
  const { game, mode } = await askToSelectGame();
  startGame(game, mode);
}
startGameManagement();
