import {
  Avatar, Card, Row, Text, Tooltip,
} from '@nextui-org/react';
import React from 'react';

const Navbar = () => (
  <nav>
    <Row justify="center" align="center">
      <Text>
        NEXT API
      </Text>
      <Card color="primary" css={{ my: '$12', mr: 16 }}>
        <Text h6 size={15} color="white" css={{ m: 0 }}>
          NextUI gives you the best developer experience with all the features
          you need for building beautiful and modern websites and
          applications.
        </Text>
      </Card>
      <Tooltip placement="bottom" content="Dark Mode">
        <Avatar
          src="https://www.freepnglogos.com/uploads/logo-tokopedia-png/logo-tokopedia-15.png"
          size="md"
          css={{ cursor: 'pointer' }}
        />
      </Tooltip>
    </Row>
  </nav>
);

export default Navbar;
