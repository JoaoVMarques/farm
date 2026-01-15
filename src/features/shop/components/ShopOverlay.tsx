import { useState } from 'react'; // Removemos useEffect daqui!
import { Container, Button, Card, Row, Col, Modal } from 'react-bootstrap';
import { useFarmStats, useShop } from '../../../hooks';
import '../styles/shop.css';
import { AdSpamSystem } from '../../../components';
import { ShopLoadingScreen } from './ShopLoadingScreen';

interface ShopProps {
  onClose: () => void;
}

export function ShopOverlay({ onClose }: ShopProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { availableItems, handlePurchase, money } = useShop();
  const { bonusInternetSpeed } = useFarmStats();

  return (
    <Modal
      show={ true }
      onHide={ onClose }
      centered
      contentClassName="bg-transparent border-0 shadow-none"
      style={ { zIndex: 1100 } }
      backdrop="static">
      <div className="shop-overlay">
        <AdSpamSystem active={ !isLoading } />
        <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
          { isLoading ? (
            <ShopLoadingScreen
              onFinish={ () => setIsLoading(false) }
              bonusSpeed={ bonusInternetSpeed }
            />
          ) : (
            <Card className="shop-window p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>🛒 AgroShop.com</h1>
                <Button variant="danger" onClick={ onClose }>X Fechar</Button>
              </div>
              <div className="shop-content text-center py-3">
                <h3>BEM VINDO À INTERNET RURAL!</h3>
                <p className="mb-4">Aqui você vai comprar melhorias para você e sua fazenda.</p>
                <div className="mt-2 p-3 border bg-light shop-scroll-area">
                  { availableItems.length === 0 ? (
                    <p className="text-muted py-5">Mais upgrades em breve 🚧🚧🚧!</p>
                  ) : (
                    <Row className="g-4">
                      { availableItems.map(item => (
                        <Col key={ item.id } xs={ 12 } md={ 4 }>
                          <Card className="h-100 shop-item-card shadow-sm text-start">
                            <Card.Body className="d-flex flex-column">
                              <Card.Title className="fs-6 fw-bold">{ item.name }</Card.Title>
                              <Card.Text className="small text-muted flex-grow-1">
                                { item.description }
                              </Card.Text>
                              <div className="mt-3 text-center">
                                <Button
                                  variant={ money >= item.price ? 'success' : 'outline-secondary' }
                                  size="sm"
                                  className="w-100 fw-bold"
                                  onClick={ () => handlePurchase(item) }
                                  disabled={ money < item.price }
                                >
                                  { money >= item.price ? 'Comprar'
                                    : 'Dinheiro insuficiente!' } <br/>
                                  R$ { item.price.toFixed(2) }
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>

                        </Col>
                      )) }
                    </Row>
                  ) }
                </div>
              </div>
            </Card>
          ) }
        </Container>
      </div>

    </Modal>
  );
}