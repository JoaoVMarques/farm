import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { UnlockPopup } from '../components';
import { useGame } from '../context/GameContext';
import { FarmPlot, SeedSelector } from '../features/home/components';
import { SettingsMenu } from '../features/home/components/SettingsMenu';
import { DesktopWindow } from '../features/windows/components/Desktopwindow';
import '../styles/style.css';
import { useState } from 'react';
import { ShopOverlay } from '../features/shop/components/ShopOverlay';
import wandoosIcon from '../assets/imgs/icons/wandoos-96.png';
import { useFarmStats } from '../hooks';
import { useSeedSystem } from '../hooks/useSeedSystem';

export function FarmPage() {
  const [isPcOpen, setIsPcOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isSeedMenuOpen, setIsSeedMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { selectedSeed, currentSeedData } = useSeedSystem();
  const { totalPlots } = useFarmStats();
  const { money, isUnlocked } = useGame();

  const plots = Array.from({ length: totalPlots });

  return (
    <Container fluid
      className="game-background vh-100 d-flex justify-content-center align-items-center p-0">
      <DesktopWindow
        show={ isPcOpen }
        onClose={ () => setIsPcOpen(false) }
        onOpenShop={ () => setIsShopOpen(true) }
        onOpenSettings={ () => setIsSettingsOpen(true) }
      />
      { isShopOpen && <ShopOverlay onClose={ () => setIsShopOpen(false) } /> }
      <SettingsMenu show={ isSettingsOpen } onClose={ () => setIsSettingsOpen(false) } />
      <SeedSelector show={ isSeedMenuOpen } onClose={ () => setIsSeedMenuOpen(false) } />

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
            onClick={ () => setIsPcOpen(true) }
            title="Meu Computador"
          >
            <img src={ wandoosIcon } alt="PC" />
          </Button>
        ) }
        { isUnlocked('UNLOCK_SEED_BAG') && (
          <Button
            variant="link"
            className="hud-icon-btn ms-2"
            onClick={ () => setIsSeedMenuOpen(true) }
            title="Trocar Sementes"
          >
            <img src={ currentSeedData.icon } alt="saco de semente" />
          </Button>
        ) }
      </div>
      <div className="farm-grid-area">
        <Row className="g-3 justify-content-center">
          { plots.map((_, index) => (
            <Col key={ index } xs="auto">
              <FarmPlot plantType={ selectedSeed } />
            </Col>
          )) }
        </Row>
      </div>

    </Container>
  );
}