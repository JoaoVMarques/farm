import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { MiniAdItem } from './MiniAdItem';
import { BIG_ADS } from '../data/adConfig';

interface Props {
  active: boolean;
}

export function AdSpamSystem({ active }: Props) {
  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(BIG_ADS[0]);
  const [adPosition, setAdPosition] = useState({ top: '50%', left: '50%' });

  const [miniAdIds, setMiniAdIds] = useState<number[]>([]);

  useEffect(() => {
    if (!active || showAd || miniAdIds.length > 0) {return;}

    const timer = setTimeout(() => {
      const rTop = Math.floor(Math.random() * 20) + 40;
      const rLeft = Math.floor(Math.random() * 20) + 40;
      const rImg = Math.floor(Math.random() * BIG_ADS.length);

      setCurrentAd(BIG_ADS[rImg]);
      setAdPosition({ top: `${rTop}%`, left: `${rLeft}%` });
      setShowAd(true);
    }, Math.random() * (15000 - 10000) + 10000);

    return () => clearTimeout(timer);
  }, [active, showAd, miniAdIds.length]);

  const triggerPunishment = (amount: number) => {
    setShowAd(false);

    const newIds = Array.from({ length: amount }, (_, i) => Date.now() + i);
    setMiniAdIds(prev => [...prev, ...newIds]);
  };

  return (
    <div className="ad-system-container">
      { showAd && (
        <div className="ad-overlay">
          <div className="ad-position-wrapper"
            style={ { top: adPosition.top, left: adPosition.left } }>
            <div className="ad-content">
              <img
                src={ currentAd }
                alt="Propaganda"
                className="ad-image"
                onClick={ () => triggerPunishment(8) }
                style={ { cursor: 'pointer' } }
              />
              <Button
                variant="danger"
                className="ad-close-btn p-0 d-flex justify-content-center align-items-center"
                onClick={ () => setShowAd(false) }
              >
                X
              </Button>
            </div>
          </div>
        </div>
      ) }

      { miniAdIds.map((id) => (
        <MiniAdItem
          key={ id }
          id={ id }
          onClose={ (closedId) => setMiniAdIds(prev => prev.filter(pid => pid !== closedId)) }
        />
      )) }
    </div>
  );
}