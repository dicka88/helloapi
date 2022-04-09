import React from 'react';
import { Row } from '@nextui-org/react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const TabButton = styled.button<{active?: boolean}>`
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  color: black; 
  font-weight: ${({ active }) => active && 'bold'};
  outline: 0;
  border: 0;
  border-bottom: ${({ active }) => active && '3px solid #0070F3'};
  background: white;
`;

const MenuTabs: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div data-testid="parent" style={{ borderBottom: '1px solid #e8e8e8', width: '100%' }}>
      <Row>
        <Link to="/documents">
          <TabButton active={pathname === '/documents'}>
            Documents
          </TabButton>
        </Link>
        <Link to="/projects">
          <TabButton active={pathname === '/projects'}>
            Projects
          </TabButton>
        </Link>
      </Row>
    </div>
  );
};

export default MenuTabs;
