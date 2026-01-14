import { useState, useEffect } from 'react';
import { Container, ProgressBar, Button, Card } from 'react-bootstrap';
import adMoreRam from '../../../assets/ad-popup/downloadMoreRam.png';
import adSolteiras from '../../../assets/ad-popup/partidasSolteiras.png';
import adVirusAlert from '../../../assets/ad-popup/virusAlert.png';
import '../styles/shop.css';
import { useShop } from '../../../hooks';

const AD_LIST = [
  adMoreRam,
  adSolteiras,
  adVirusAlert,
];

interface ShopProps {
  onClose: () => void;
}

export function ShopOverlay({ onClose }: ShopProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(AD_LIST[0]);
  const [adPosition, setAdPosition] = useState({ top: '-1000px', left: '-1000px' });
  const { availableItems, handlePurchase, money } = useShop();

  useEffect(() => {
    if (!isLoading) {return;}

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        const newProgress = oldProgress + diff;
        if (newProgress >= 100) {
          return 100;
        }
        return newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading || showAd) {return;}
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

  }, [isLoading, showAd]);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <div className="shop-overlay">
      { showAd && (
        <div className="ad-overlay">
          <div className="ad-position-wrapper"
            style={ { top: adPosition.top, left: adPosition.left } }
          >
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
      ) }
      <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
        { isLoading ? (
          <Card className="loading-card p-4 text-center">
            <h2 className="mb-4">Conectando ao Servidor...</h2>
            <div className="mb-2">Discando...</div>
            <ProgressBar
              animated
              now={ progress }
              label={ `${Math.round(progress)}%` }
              variant="info"
              className="w-100"
              style={ { height: '25px' } }
            />

            <small className="text-muted mt-3 d-block">
              Aguarde, sua linha telefônica está sendo usada...
            </small>
          </Card>
        ) : (
          <Card className="shop-window p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1>🛒 AgroShop.com</h1>
              <Button variant="danger" onClick={ onClose }>X Fechar</Button>
            </div>

            <div className="shop-content text-center py-5">
              <h3>BEM VINDO À INTERNET RURAL!</h3>
              <p>Aqui você vai comprar melhorias para você e sua fazenda.</p>
              <div className="mt-4 p-3 border bg-light">
                <div className="shop-items-grid">
                  { availableItems.length === 0 ? (
                    <p>Nenhum item disponível no momento. Jogue mais!</p>
                  ) : (
                    availableItems.map(item => (
                      <div key={ item.id } className="shop-item-card">
                        <h5>{ item.name }</h5>
                        <p>{ item.description }</p>
                        <button
                          onClick={ () => handlePurchase(item) }
                          disabled={ money < item.price } // Desabilita se for pobre
                        >
                    Comprar R$ { item.price }
                        </button>
                      </div>
                    ))
                  ) }
                </div>
              </div>
            </div>
          </Card>
        ) }
      </Container>
    </div>
  );
}