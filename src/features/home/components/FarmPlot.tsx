import { PlantType } from '../../../data/plantConfig';
import { usePlantGrowth } from '../hooks/usePlantGrowth';

interface props {
  plantType: PlantType;
}

export function FarmPlot({ plantType }: props) {
  const { currentSprite, interact, isMature } = usePlantGrowth(plantType);

  return (
    <div className={ `farm-plot ${isMature ? 'ready-to-harvest' : ''}` } onClick={ interact }>
      {
        currentSprite && (
          <img src={ currentSprite } alt="planta" className="plant-image"></img>
        )
      }
    </div>
  );
}
