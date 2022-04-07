import React from 'react';
import {
  Button, Card, Image, Row, Text, Tooltip,
} from '@nextui-org/react';
import { AiFillMail } from 'react-icons/ai';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ProfileDropdown from './ProfileDropdown';
import useUser from '../../zustand/useUser';
import AvatarShortName from '../AvatarShortName/AvatarShortName';

const Nav = styled.nav`
  padding: 1em 0;
`;

const Navbar: React.FC = () => {
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
          <Image
            src="/logo/logohorizontal.svg"
            height={36}
          />
        </Link>
        <div>
          <Row>
            <Button auto light css={{ marginRight: '$8' }}>
              Usage
            </Button>
            <Tooltip trigger="click" placement="bottomEnd" content={<ProfileDropdown />}>
              <AvatarShortName name={user?.name!} />
            </Tooltip>
          </Row>
        </div>
      </Row>
    </Nav>
  );
};

export default Navbar;
