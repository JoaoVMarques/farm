import { Modal } from 'react-bootstrap';
import marketIcon from '../../../assets/marketIcon.png';
import settingsIcon from '../../../assets/configIcon.png';
import '../styles/window.css';
import { useGame } from '../../../context/GameContext';

interface DesktopProps {
  show: boolean;
  onClose: () => void;
  onOpenShop: () => void;
  onOpenSettings: () => void;
}

export function DesktopWindow({ show, onClose, onOpenShop, onOpenSettings }: DesktopProps) {
  const { isUnlocked } = useGame();

  return (
    <Modal
      show={ show }
      onHide={ onClose }
      centered
      dialogClassName="custom-desktop-modal"
      backdropClassName="desktop-backdrop"
    >
      <div className="desktop-header">
        <span className="ms-2">🖥️ Wanndos 96</span>
        <button className="desktop-close-btn" onClick={ onClose }>X</button>
      </div>
      <div className="desktop-body">

        <div className="desktop-icon" onClick={ onOpenShop }>
          <div className="icon-img-wrapper">
            <img src={ marketIcon } alt="Market" />
          </div>
          <span className="icon-label">Market</span>
        </div>

        { isUnlocked('GAME_SETTINGS') && (
          <div className="desktop-icon" onClick={ onOpenSettings }>
            <div className="icon-img-wrapper">
              <img src={ settingsIcon } alt="Configurações" />
            </div>
            <span className="icon-label">Painel de Controle</span>
          </div>
        ) }
      </div>
      <div className="taskbar">
        <div className="start-btn">Start</div>
        <div className="clock">12:00 PM</div>
      </div>
    </Modal>
  );
}