import { Container, Row, Text } from '@nextui-org/react';
import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const Invoices: React.FC = () => (
  <Container lg>
    <Navbar />

    <Row justify="center">
      <Text h1>
        Invoices Page
      </Text>
    </Row>
  </Container>
);

export default Invoices;
