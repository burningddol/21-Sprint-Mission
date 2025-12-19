import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Main from './Main';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
