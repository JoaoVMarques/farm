import { Container, Card, Row, Col, Button } from 'react-bootstrap'; // Importe os componentes
import { UnlockPopup } from '../components';
import { useGame } from '../context/GameContext';
import { FarmPlot } from '../features/home/components';
import '../styles/style.css';
import { useState } from 'react';
import { ShopOverlay } from '../features/shop/components/ShopOverlay';
import marketIcon from '../assets/marketIcon.png';
import { useFarmStats } from '../hooks';

export function FarmPage() {
  const [isShopOpen, setIsShopOpen] = useState(false);

  const { totalPlots } = useFarmStats();
  const { money, isUnlocked } = useGame();

  const plots = Array.from({ length: totalPlots });

  return (
    <Container fluid
      className="game-background vh-100 d-flex justify-content-center align-items-center p-0">

      { isShopOpen && <ShopOverlay onClose={ () => setIsShopOpen(false) } /> }
      <UnlockPopup />
      <div className="hud-container">
        { isUnlocked('SHOW_MONEY_UI') && (
          <Card className="money-card">
            <Card.Body className="d-flex align-items-center p-2 ps-3 pe-4">
              <span className="fs-2 me-2">💰</span>
              <div className="lh-1">
                <small className="text-muted fw-bold"
                  style={ { fontSize: '0.75rem' } }>Saldo</small>
                <div className="fw-bold text-success">R$ { money.toFixed(2) }</div>
              </div>
            </Card.Body>
          </Card>
        ) }
        { isUnlocked('UNLOCK_SHOP') && (
          <Button
            variant="link"
            className="hud-icon-btn"
            onClick={ () => setIsShopOpen(true) }
            title="Abrir Loja"
          >
            <img src={ marketIcon } alt="Loja" />
          </Button>
        ) }

      </div>

      <div className="farm-grid-area">
        <Row className="g-3 justify-content-center">
          { plots.map((_, index) => (
            <Col key={ index } xs="auto">
              <FarmPlot plantType="wheat" />
            </Col>
          )) }
        </Row>
      </div>

    </Container>
  );
}