import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { UnlockPopup } from '../components';
import { useGame } from '../context/GameContext';
import { FarmPlot, SeedSelector } from '../features/home/components';
import { SettingsMenu } from '../features/home/components/';
import '../styles/style.css';
import { useState } from 'react';
import { ShopOverlay } from '../features/shop/components/ShopOverlay';
import marketIcon from '../assets/marketIcon.png';
import configIcon from '../assets/configIcon.png';
import { useFarmStats } from '../hooks';
import { useSeedSystem } from '../hooks/useSeedSystem';

export function FarmPage() {
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
      { isShopOpen && <ShopOverlay onClose={ () => setIsShopOpen(false) } /> }
      <SeedSelector show={ isSeedMenuOpen } onClose={ () => setIsSeedMenuOpen(false) } />
      <SettingsMenu show={ isSettingsOpen } onClose={ () => setIsSettingsOpen(false) } />

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

        { isUnlocked('GAME_SETTINGS') && (
          <Button
            variant="link"
            className="hud-icon-btn ms-2"
            onClick={ () => setIsSettingsOpen(true) }
            title="Configurações"
          >
            <img src={ configIcon } alt="botão configurações" />
          </Button>
        ) }

      </div>

      { /* --- GRID DA FAZENDA --- */ }
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