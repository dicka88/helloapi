import {
  Avatar, Button, Image, Row,
} from '@nextui-org/react';
import React from 'react';
import { Link } from 'react-router-dom';

import useUser from '../../zustand/useUser';

const NavbarHomepage: React.FC = () => {
  const { user } = useUser();

  return (
    <nav>
      <Row justify="space-between" css={{ py: '$16' }}>
        <Link to="/">
          <Image
            src="/logo/logohorizontal.svg"
          />
        </Link>
        <div>
          <Row>
            {user?.id && (
            <>
              <Link to="/documents">
                <Button auto css={{ marginRight: '$4' }}>Go to App</Button>
              </Link>
              <Avatar
                src={user?.avatarUrl || 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=20&m=1214428300&s=612x612&w=0&h=MOvSM2M1l_beQ4UzfSU2pfv4sRjm0zkpeBtIV-P71JE='}
                size="md"
              />
            </>
            )}
            {!user?.id && (
            <>
              <Link to="/signin">
                <Button auto css={{ marginRight: '$4' }}>Signin</Button>
              </Link>
              <Link to="/signup">
                <Button auto light>Signup</Button>
              </Link>
            </>
            )}
          </Row>
        </div>
      </Row>
    </nav>
  );
};

export default NavbarHomepage;
