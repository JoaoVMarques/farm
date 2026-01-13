import { Toast, ToastContainer } from 'react-bootstrap';
import { useGame } from '../context/GameContext';
import '../styles/style.css'; // Importamos para customizar as cores depois

export function UnlockPopup() {
  const { notification, closeNotification } = useGame();

  return (
    <ToastContainer position="top-center" className="p-3" style={ { zIndex: 9999 } }>
      <Toast
        show={ !!notification }
        onClose={ closeNotification }
        delay={ 15000 }
        autohide
        className="game-toast"
      >
        <Toast.Header closeButton={ true }>
          <strong className="me-auto">🎉 Nova Conquista!</strong>
          <small>Agora mesmo</small>
        </Toast.Header>
        <Toast.Body className="text-white">
          { notification }
        </Toast.Body>
      </Toast>

    </ToastContainer>
  );
}