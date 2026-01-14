import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import Router from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GameProvider } from './context/GameContext';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </GameProvider>
  </StrictMode>,
);
