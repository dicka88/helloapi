import { Row, Tooltip } from '@nextui-org/react';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Dropdown from './Dropdown';

import MethodLabel from './MethodLabel';

interface Props {
  children: React.ReactNode,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  link: string,
  title?: string,
  prefixPath: string,
  path: string
}

const ToolbarButton = styled.span`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  transition: 0.2s ease-in-out;
  &:hover {
    background: #e8e8e8;
  }
`;

const ListEndpoint: React.FC<Props> = ({
  children, method, link, title = '', prefixPath, path,
}) => {
  const Div = styled.div`
    width: 100%;
    padding: 0.2rem;
    border-radius: 6px;
    margin-bottom: 0.5em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    color: #666666;
    &:hover {
      color: #000;
    }
  `;

  return (
    <Row justify="space-between" align="center" css={{ transition: '0.1s ease-in', '&:hover': { background: '$gray100' } }}>
      <Link to={link} style={{ display: 'block', width: '100%' }}>
        <Div title={title}>
          <MethodLabel method={method} />
          {children}
        </Div>
      </Link>
      <ToolbarButton style={{ cursor: 'pointer' }}>
        <Tooltip trigger="click" placement="bottomStart" content={<Dropdown prefixPath={prefixPath} path={path} />}>
          <BsThreeDots />
        </Tooltip>
      </ToolbarButton>
    </Row>
  );
};

export default ListEndpoint;
