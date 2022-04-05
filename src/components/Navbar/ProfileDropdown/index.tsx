import { Divider, Text } from '@nextui-org/react';
import React from 'react';
import { AiOutlineLogout, AiOutlineSetting, AiOutlineTransaction } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useUser from '../../../zustand/useUser';

const Container = styled.div`
  padding: 1em;
  min-width: 150px;
`;

const ListButton = styled.button`
  cursor: pointer;
  text-align: left;
  display: block;
  background: transparent;
  width: 100%;
  outline: none;
  border: none;
  padding: 0.5em 0;
  ${({ color }) => color && `color: ${color}`};
  transition: 0.1s ease-in;
  &:hover {
    font-weight: bold;
  }
`;

const ProfileDropdown: React.FC = () => {
  const navigate = useNavigate();
  const { flush } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('token');
    flush();

    navigate('/');
  };

  return (
    <Container>
      <div>
        <Text weight="bold">Dicka Ismaji</Text>
      </div>
      <Divider css={{ my: '$6' }} />
      <Link to="/invoices">
        <ListButton>
          <AiOutlineTransaction style={{ display: 'inline', marginRight: '1em' }} />
          Invoices
        </ListButton>
      </Link>
      <Link to="/settings">
        <ListButton>
          <AiOutlineSetting style={{ display: 'inline', marginRight: '1em' }} />
          Settings
        </ListButton>
      </Link>
      <ListButton onClick={handleLogout} color="red">
        <AiOutlineLogout style={{ display: 'inline', marginRight: '1em' }} />
        Logout
      </ListButton>
    </Container>
  );
};

export default ProfileDropdown;
