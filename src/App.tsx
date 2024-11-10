import { RouterProvider } from 'react-router-dom';

import router from './routes';
import useAppMount from './hooks/useAppMount';

function App() {
  useAppMount();

  return <RouterProvider router={router} />;
}

export default App;
