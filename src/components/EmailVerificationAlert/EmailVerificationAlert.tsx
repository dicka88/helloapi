import React from 'react';
import {
  Button, Card, Row, Text,
} from '@nextui-org/react';
import { AiFillMail } from 'react-icons/ai';

const EmailVerificationAlert = () => {
  const verifyHandler = () => {
    console.log('Coming soon');
  };

  return (
    <Card color="warning" css={{ mt: '$6', mb: '$8' }}>
      <Row justify="space-between" align="center">
        <Text h6 size={15} color="white" css={{ m: 0 }}>
          <AiFillMail size={15} style={{ marginRight: '1em' }} />
          Your email is not verified
        </Text>
        <Button auto light css={{ color: 'white' }} onClick={verifyHandler}>
          Verify now
        </Button>
      </Row>
    </Card>
  );
};

export default EmailVerificationAlert;
