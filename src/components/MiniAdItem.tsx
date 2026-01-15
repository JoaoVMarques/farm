import { useMemo } from 'react';
import { Button } from 'react-bootstrap';
// Importe a lista de imagens aqui ou receba via props se preferir
import { MINI_ADS } from '../data/adConfig';

interface MiniAdProps {
  id: number;
  onClose: (id: number) => void;
  forcedImg?: string
}

export function MiniAdItem({ id, onClose, forcedImg }: MiniAdProps) {
  const config = useMemo(() => {
    return {
      top: `${Math.floor(Math.random() * 60) + 20}%`,
      left: `${Math.floor(Math.random() * 60) + 20}%`,
      img: forcedImg || MINI_ADS[Math.floor(Math.random() * MINI_ADS.length)],
    };
  }, [forcedImg]);

  return (
    <div className="mini-ad-wrapper" style={ { top: config.top, left: config.left } }>
      <div className="ad-content mini-ad-style">
        <img src={ config.img } className="ad-image-mini" alt="Spam" />
        <Button
          variant="danger"
          className="ad-close-btn-mini p-0 d-flex justify-content-center align-items-center"
          onClick={ () => onClose(id) }
        >
          x
        </Button>
      </div>
    </div>
  );
}