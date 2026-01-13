import { Routes, Route, Navigate } from 'react-router-dom';
import { FarmPage } from '../pages';

function Router() {
  return (
    <Routes>
      <Route path="*" element={ <Navigate to="/farm" replace /> } />
      <Route path="/farm" element={ <FarmPage /> } />
    </Routes>
  );
}

export default Router;
