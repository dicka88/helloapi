import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../../zustand/useUser';

type Props = {
  children: ReactElement
}

const ProtectedRoute: React.FC<Props> = ({ children }: Props) => {
  const { user } = useUser();
  const { pathname } = useLocation();

  if (!user?.id) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{
          from: { pathname },
          message: 'You must signin first',
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
