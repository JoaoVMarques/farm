import { Routes, Route, Navigate } from 'react-router-dom';

function Router() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default Router;
