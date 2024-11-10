import { StrictMode } from 'react';
import { createRoot, Container } from 'react-dom/client';

import AppProvider from './providers/AppProvider';

function mount(ele: Container) {
  const root = createRoot(ele);

  root.render(
    <StrictMode>
      <AppProvider />
    </StrictMode>,
  );

  return () => queueMicrotask(() => root.unmount());
}

export { mount };
