import { Container, Card, Row, Col } from 'react-bootstrap'; // Importe os componentes
import { UnlockPopup } from '../components';
import { useGame } from '../context/GameContext';
import { FarmPlot } from '../features/home/components';
import '../styles/style.css';

export function FarmPage() {
  const { money, isUnlocked } = useGame();
  const plots = Array.from({ length: 1 });

  return (
    <Container fluid
      className="game-background vh-100 d-flex justify-content-center align-items-center p-0">
      <UnlockPopup />
      <div className="hud-container">
        { isUnlocked('SHOW_MONEY_UI') && (
          <Card className="money-card">
            <Card.Body className="d-flex align-items-center p-2">
              <span className="fs-2 me-2">💰</span>
              <div className="lh-1">
                <small className="text-muted fw-bold"
                  style={ { fontSize: '0.75rem' } }>SALDO</small>
                <div className="fw-bold text-success">R$ { money.toFixed(2) }</div>
              </div>
            </Card.Body>
          </Card>
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