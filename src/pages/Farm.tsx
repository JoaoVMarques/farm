import { FarmPlot } from '../features/home/components';
import '../styles/style.css';

export function FarmPage() {
  return (
    <div className="game-background min-vh-100 d-flex justify-content-center align-items-center">
      <FarmPlot plantType="wheat"/>
    </div>
  );
}