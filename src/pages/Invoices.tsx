import { Container, Row, Text } from '@nextui-org/react';
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Seo from '../components/Seo/Seo';

const Invoices: React.FC = () => (
  <Container lg>
    <Seo title="Invoices - Hello API" />
    <Navbar />

    <Row justify="center">
      <Text h1>
        Invoices Page
      </Text>
    </Row>
  </Container>
);

export default Invoices;
