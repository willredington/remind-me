import { Dashboard } from '@remind-me/frontend/customer/feat-dashboard';
import { Route, Routes } from 'react-router-dom';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}
