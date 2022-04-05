import { Container, Row, Text } from '@nextui-org/react';
import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const Settings: React.FC = () => (
  <Container lg>
    <Navbar />

    <Row justify="center">
      <Text h1>
        Settings Page
      </Text>
    </Row>
  </Container>
);

export default Settings;
