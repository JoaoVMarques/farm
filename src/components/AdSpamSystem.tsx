import { useEffect, useState } from 'react';
import adMoreRam from '../assets/ad-popup/downloadMoreRam.png';
import adSolteiras from '../assets/ad-popup/partidasSolteiras.png';
import adVirusAlert from '../assets/ad-popup/virusAlert.png';
import { Button } from 'react-bootstrap';

const AD_LIST = [adMoreRam, adSolteiras, adVirusAlert];

interface props {
  active: boolean;
}

export function AdSpamSystem({ active }: props) {
  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(AD_LIST[0]);
  const [adPosition, setAdPosition] = useState({ top: '-1000px', left: '-1000px' });

  useEffect(() => {
    if (!active || showAd) {return;}
    const randomTime = Math.random() * (35000 - 20000) + 20000;
    const timer = setTimeout(() => {
      const randomTop = Math.floor(Math.random() * 20) + 40;
      const randomLeft = Math.floor(Math.random() * 20) + 40;

      const randomIndex = Math.floor(Math.random() * AD_LIST.length);

      setCurrentAd(AD_LIST[randomIndex]);
      setAdPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
      setShowAd(true);
    }, randomTime);

    return () => clearTimeout(timer);
  }, [active, showAd]);

  if (!showAd) {return null;}

  return (
    <div className="ad-overlay">
      <div
        className="ad-position-wrapper"
        style={ { top: adPosition.top, left: adPosition.left } }
      >
        <div className="ad-content"> { /* Adicionei a div de conteúdo que faltava no seu CSS novo */ }
          <img src={ currentAd } alt="Propaganda" className="ad-image" />
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
  );
}