import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { MiniAdItem } from './MiniAdItem';
import { BIG_ADS } from '../data/adConfig';
import { useFarmStats, useSfx } from '../hooks';
import { AD_BLOCK_IMG } from '../data/adConfig';

interface Props {
  active: boolean;
}

interface MiniAdObject {
  id: number;
  img?: string;
}

export function AdSpamSystem({ active }: Props) {
  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(BIG_ADS[0]);
  const [adPosition, setAdPosition] = useState({ top: '50%', left: '50%' });

  const [miniAdIds, setMiniAdIds] = useState<MiniAdObject[]>([]);

  const { hasFreeAdBlock } = useFarmStats();
  const { adClick, adAppear } = useSfx();

  const spawnMiniAds = (amount: number, specificImg?: string) => {
    const newAds = Array.from({ length: amount }, (_, i) => ({
      id: Date.now() + i,
      img: specificImg,
    }));
    setMiniAdIds(prev => [...prev, ...newAds]);
  };

  const triggerPunishment = (amount: number) => {
    adClick();
    setShowAd(false);
    spawnMiniAds(amount);
  };

  useEffect(() => {
    if (!active || showAd || miniAdIds.length > 0) {return;}
    let timerToSpawnAdd = Math.random() * (15000 - 10000) + 10000;

    if (hasFreeAdBlock) {
      timerToSpawnAdd += 5000;
    }

    const timer = setTimeout(() => {
      const rTop = Math.floor(Math.random() * 20) + 40;
      const rLeft = Math.floor(Math.random() * 20) + 40;
      const rImg = Math.floor(Math.random() * BIG_ADS.length);

      setCurrentAd(BIG_ADS[rImg]);
      setAdPosition({ top: `${rTop}%`, left: `${rLeft}%` });
      setShowAd(true);
      adAppear();

      if (hasFreeAdBlock) {
        spawnMiniAds(1, AD_BLOCK_IMG);
      }
    }, timerToSpawnAdd);

    return () => clearTimeout(timer);
  }, [active, showAd, miniAdIds.length]);

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

      { miniAdIds.map((adObj) => (
        <MiniAdItem
          key={ adObj.id }
          id={ adObj.id }
          forcedImg={ adObj.img }
          onClose={ (closedId) => setMiniAdIds(prev => prev.filter((p) => p.id !== closedId)) }
        />
      )) }
    </div>
  );
}