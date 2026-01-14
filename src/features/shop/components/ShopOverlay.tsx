import { useState } from 'react'; // Removemos useEffect daqui!
import { Container, Button, Card } from 'react-bootstrap';
import { useShop } from '../../../hooks';
import '../styles/shop.css';
import { AdSpamSystem } from '../../../components';
import { ShopLoadingScreen } from './ShopLoadingScreen';

interface ShopProps {
  onClose: () => void;
}

export function ShopOverlay({ onClose }: ShopProps) {
  const [isLoading, setIsLoading] = useState(true);

  const { availableItems, handlePurchase, money } = useShop();

  return (
    <div className="shop-overlay">
      <AdSpamSystem active={ !isLoading } />

      <Container className="h-100 d-flex flex-column justify-content-center align-items-center">

        { isLoading ? (
          <ShopLoadingScreen onFinish={ () => setIsLoading(false) } />
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
                    <p>Nenhum item disponível. Jogue mais para liberar!</p>
                  ) : (
                    availableItems.map(item => (
                      <div key={ item.id } className="shop-item-card">
                        <h5>{ item.name }</h5>
                        <p>{ item.description }</p>
                        <button
                          onClick={ () => handlePurchase(item) }
                          disabled={ money < item.price }
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