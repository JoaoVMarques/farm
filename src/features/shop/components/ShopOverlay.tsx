import { useState, useEffect } from 'react';
import { Container, ProgressBar, Button, Card } from 'react-bootstrap';
import adImage from '../../../assets/ad-popup/downloadMoreRam.png';
import '../styles/shop.css';

interface ShopProps {
  onClose: () => void;
}

export function ShopOverlay({ onClose }: ShopProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [adPosition, setAdPosition] = useState({ top: '-1000px', left: '-1000px' });

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
    const randomTime = Math.random() * (45000 - 30000) + 30000;

    const timer = setTimeout(() => {
      const randomTop = Math.floor(Math.random() * 20) + 40;
      const randomLeft = Math.floor(Math.random() * 20) + 40;

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
            <img src={ adImage } alt="Propaganda" className="ad-image" />
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
                <strong>ITEM EM DESTAQUE:</strong><br/>
                   Em breve 🚧<br/>
              </div>
            </div>
          </Card>
        ) }
      </Container>
    </div>
  );
}