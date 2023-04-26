import { Dashboard } from '@remind-me/frontend/customer/feat-dashboard';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '@remind-me/frontend/customer/ui-navbar';
import { VStack } from '@chakra-ui/react';

export function Router() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}
