import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Portfolio } from './components/Portfolio';

export const App = () => {
  return (
    <HelmetProvider>
      <Portfolio />
    </HelmetProvider>
  );
}; 