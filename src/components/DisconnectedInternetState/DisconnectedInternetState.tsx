import React from 'react';
import {
  Button, Row, Spacer, Text,
} from '@nextui-org/react';

type Props = {
  refetch: () => void
}

const DisconnectedInternetState: React.FC<Props> = ({ refetch }) => (
  <Row justify="center" css={{ py: '$24' }}>
    <div style={{ textAlign: 'center' }}>
      <img src="/illustrations/kingdom-no-connection.png" width="360px" alt="" />
      <Spacer y={1} />
      <Text h5>
        Your internet connection is not good
      </Text>
      <Spacer y={1} />
      <Row justify="center">
        <Button onClick={refetch}>
          Retry again
        </Button>
      </Row>
    </div>
  </Row>
);

export default DisconnectedInternetState;
