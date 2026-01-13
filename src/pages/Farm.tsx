import { usePlant } from '../features/home/hooks/usePlant';
import { plotPlanted } from '../features/home/imgs';
import '../styles/style.css';

export function FarmPage() {
  const {
    isPlanted,
    setPlanted,
  } = usePlant();

  return (
    <div className="game-background min-vh-100 d-flex justify-content-center align-items-center">
      <div className="farm-plot" onClick={ () => setPlanted(true) }>
        {
          isPlanted ? (
            <img src={ plotPlanted } alt="plot plantado" />
          ) : null
        }
      </div>
    </div>
  );
}