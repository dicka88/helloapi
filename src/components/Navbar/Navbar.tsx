import React from 'react';
import {
  Avatar,
  Button, Image, Row, Tooltip,
} from '@nextui-org/react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FcFlashOn } from 'react-icons/fc';
import ProfileDropdown from './ProfileDropdown';
import useUser from '../../zustand/useUser';
import AvatarShortName from '../AvatarShortName/AvatarShortName';
// import EmailVerificationAlert from '../EmailVerificationAlert/EmailVerificationAlert';

const Nav = styled.nav`
  padding: 1em 0;
  border-bottom: 1px solid #e8e8e8;
`;

const Navbar: React.FC = () => {
  const { user } = useUser();

  return (
    <Nav>
      {/* {!user?.emailVerifiedAt && (
        <EmailVerificationAlert />
      )} */}
      <Row justify="space-between" align="center">
        <Link to="/documents">
          <Image
            src="/logo/logohorizontal.svg"
            height={36}
          />
        </Link>
        <div>
          <Row>
            <Button auto ghost color="gradient" css={{ marginRight: '$8' }} iconRight={<FcFlashOn />}>
              Usage
            </Button>
            <Tooltip trigger="click" placement="bottomEnd" content={<ProfileDropdown />}>
              {user?.avatarUrl
                ? (
                  <Avatar
                    src={user?.avatarUrl}
                    css={{ cursor: 'pointer' }}
                  />
                )
                : <AvatarShortName name={user?.name!} color="#000000" />}
            </Tooltip>
          </Row>
        </div>
      </Row>
    </Nav>
  );
};

export default Navbar;
