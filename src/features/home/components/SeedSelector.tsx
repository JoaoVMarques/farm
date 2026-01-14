import { Card, Col, Modal, Row } from "react-bootstrap";
import { useSeedSystem } from "../../../hooks/useSeedSystem";

interface props {
  show: boolean;
  onClose: () => void
}

export function SeedSelector({ show, onClose }: props) {
  const { unlockedSeeds, selectedSeed, selectSeed } = useSeedSystem()

  const handleSelect = (seedId: any) => {
    selectSeed(seedId);
    onClose();
  }

return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>🎒 Bolsa de Sementes</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <Row className="g-3">
          {unlockedSeeds.map((seed) => (
            <Col key={seed.id} xs={6} md={4}>
              <Card 
                className={`h-100 text-center cursor-pointer ${selectedSeed === seed.id ? 'border-success border-3' : ''}`}
                onClick={() => handleSelect(seed.id)}
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              >
                <Card.Body>
                    <img src={ seed.icon } alt="saco de semente" />
                    <h5 className="mt-2">{seed.name}</h5>
                    <div className="mt-2 fw-bold text-success">
                        Valor: R$ {seed.sellPrice}
                    </div>
                    {selectedSeed === seed.id && (
                        <div className="badge bg-success mt-2">Selecionada</div>
                    )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  );
}