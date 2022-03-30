import React from 'react';
import styled from 'styled-components';
import MethodLabel from './MethodLabel';

interface Props {
  children: React.ReactNode,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  title?: string,
}

const ListEndpoint: React.FC<Props> = ({ children, method, title = '' }) => {
  const Div = styled.div`
    width: 100%;
    margin-bottom: 0.5em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `;

  return (
    <Div title={title}>
      <MethodLabel method={method} />
      {children}
    </Div>
  );
};

export default ListEndpoint;
