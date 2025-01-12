import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { log } from '@arpitmalik832/react-ts-rollup-library';

function PageWrapper() {
  const location = useLocation();

  useEffect(() => {
    log('Route changed:', location.pathname);
  }, [location]);

  return (
    <div>
      Page Wrapper
      <Outlet />
    </div>
  );
}

export default PageWrapper;
