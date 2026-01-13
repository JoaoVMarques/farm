import { UnlockPopup } from '../components';
import { useGame } from '../context/GameContext';
import { FarmPlot } from '../features/home/components';
import '../styles/style.css';

export function FarmPage() {
  const { money, isUnlocked } = useGame();

  return (
    <div className="game-background min-vh-100 d-flex justify-content-center align-items-center">
      <UnlockPopup />
      <div className="hud-container">
        { isUnlocked('SHOW_MONEY_UI') && (
          <div className="money-panel">
            <span style={ { fontSize: '1.5rem' } }>💰</span>
            <div className="d-flex flex-column">
              <span style={ { fontSize: '0.8rem', color: '#555' } }>Saldo</span>
              <span>R$ { money.toFixed(2) }</span>
            </div>
          </div>
        ) }
      </div>
      <div className="farm-grid-area">
        <FarmPlot plantType="wheat" />
      </div>
    </div>
  );
}