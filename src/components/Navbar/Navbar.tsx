import React from 'react';
import {
  Avatar, Button, Card, Row, Text, Tooltip,
} from '@nextui-org/react';
import { AiFillMail } from 'react-icons/ai';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ProfileDropdown from './ProfileDropdown';
import useUser from '../../zustand/useUser';

const Nav = styled.nav`
  padding: 1em 0;
`;

const Navbar = () => {
  const { user } = useUser();

  return (
    <Nav>
      {!user?.emailVerifiedAt && (
      <Card color="warning" css={{ mt: '$6', mb: '$8' }}>
        <Row justify="space-between" align="center">
          <Text h6 size={15} color="white" css={{ m: 0 }}>
            <AiFillMail size={15} style={{ marginRight: '1em' }} />
            Your email is not verified
          </Text>
          <Button auto light css={{ color: 'white' }}>
            Verify now
          </Button>
        </Row>
      </Card>
      )}
      <Row justify="space-between" align="center">
        <Link to="/projects">
          <Text h3>
            Hello API
          </Text>
        </Link>
        <Tooltip trigger="click" placement="bottomEnd" content={<ProfileDropdown />}>
          <Avatar
            src="https://www.freepnglogos.com/uploads/logo-tokopedia-png/logo-tokopedia-15.png"
            size="md"
            css={{ cursor: 'pointer' }}
          />
        </Tooltip>
      </Row>
    </Nav>
  );
};

export default Navbar;
