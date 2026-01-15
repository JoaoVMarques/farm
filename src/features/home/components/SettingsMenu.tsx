import { Modal, Button, Form, ProgressBar } from 'react-bootstrap';

interface Props {
  show: boolean;
  onClose: () => void;
}

export function SettingsMenu({ show, onClose }: Props) {
  return (
    <Modal show={ show } onHide={ onClose } centered>
      <Modal.Header
        closeButton
        style={ {
          backgroundColor: '#000080',
          color: 'white',
          borderRadius: '0',
        } }
      >
        <Modal.Title style={ { fontFamily: '"Courier New", Courier, monospace', fontSize: '1.2rem' } }>
          ⚙️ C:\SYSTEM\CONFIG.EXE
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={ { backgroundColor: '#c0c0c0', border: '2px solid white' } }>

        { /* ÁUDIO */ }
        <div className="mb-4">
          <h6 className="fw-bold">🔊 Volume do Sistema</h6>
          <input type="range" className="form-range" min="0" max="100" defaultValue="50" />
          <small className="text-muted">Recomendado: 50% (para não estourar a caixa de som)</small>
        </div>

        { /* GRÁFICOS */ }
        <div className="mb-4">
          <h6 className="fw-bold">📺 Qualidade Gráfica</h6>
          <Form.Select size="sm" defaultValue="low">
            <option value="ultra">4K Ultra HD (Vai travar)</option>
            <option value="high">1080p</option>
            <option value="low">240p (Estilo Batata)</option>
            <option value="text">Apenas Texto (DOS)</option>
          </Form.Select>
        </div>

        { /* DADOS */ }
        <div className="p-2 border border-dark bg-white mb-3">
          <h6 className="text-danger fw-bold">☠️ Zona de Perigo</h6>
          <Button variant="danger" size="sm" className="w-100" disabled>
                DELETAR SAVE GAME
          </Button>
          <small className="d-block text-center mt-1">Botão quebrado pelo desenvolvedor</small>
        </div>

        <ProgressBar now={ 100 } label="Memória RAM: 128MB / 128MB" variant="info" className="mb-2" />

      </Modal.Body>

      <Modal.Footer style={ { backgroundColor: '#c0c0c0', borderTop: 'none' } }>
        <Button variant="success" onClick={ onClose } style={ { border: '2px outset white', borderRadius: 0 } }>
          Aplicar (Talvez)
        </Button>
      </Modal.Footer>
    </Modal>
  );
}