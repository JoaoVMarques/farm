import { Modal, Button, Form } from 'react-bootstrap';
import { useSettings } from '../../../context/SettingsContext';
import { useSfx } from '../../../hooks';

interface Props {
  show: boolean;
  onClose: () => void;
}

export function SettingsMenu({ show, onClose }: Props) {
  const { settings, updateSetting } = useSettings();
  const { plantMature } = useSfx();

  const handleSoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSetting('plantSoundMode', e.target.value);

    plantMature(e.target.value, 0);
  };

  return (
    <Modal show={ show } onHide={ onClose } centered style={ { zIndex: 9999 } }>
      <Modal.Header
        style={ {
          backgroundColor: '#000080',
          color: 'white',
          borderRadius: '0',
        } }
      >
        <Modal.Title style={ {
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '1.2rem',
        } }>
          ⚙️ C:\SYSTEM\CONFIG.EXE
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={ { backgroundColor: '#c0c0c0', border: '2px solid white' } }>

        <div className="mb-4">
          <h6 className="fw-bold">🎵 Som de Crescimento</h6>
          <Form.Select
            size="sm"
            value={ settings.plantSoundMode }
            onChange={ (e) => handleSoundChange(e) }
            style={ { cursor: 'pointer' } }
          >
            <option value="none">🔇 Silencioso</option>
            <option value="sound1">🎹 Clássico (Som 1)</option>
            <option value="sound2">💲 dinheiro (Som 2)</option>
            <option value="sound3">🔘 bip (Som 3)</option>
          </Form.Select>
          <small className="text-muted">Reinicie o crescimento para ouvir a mudança.</small>
        </div>

        <hr className="border-secondary" />

        <div className="mb-4">
          <h6 className="fw-bold">
            🔊 Volume do Sistema: { settings.masterVolume }%
          </h6>
          <input
            type="range"
            className="form-range"
            min="0"
            max="100"
            value={ settings.masterVolume }
            onChange={ (e) => updateSetting('masterVolume', Number(e.target.value)) }
          />
        </div>

      </Modal.Body>

      <Modal.Footer style={ { backgroundColor: '#c0c0c0', borderTop: 'none' } }>
        <Button
          variant="success"
          onClick={ onClose }
          style={ { border: '2px outset white', borderRadius: 0 } }
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}