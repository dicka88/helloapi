import { Button, Row, Spacer } from '@nextui-org/react';
import React from 'react';

type Props = {
  refetch: () => void
}

const DisconnectedInternetState: React.FC<Props> = ({ refetch }) => (
  <Row justify="center">
    <div>
      <img src="/illustrations/kingdom-no-connection.png" alt="" />
      <Spacer y={6} />
      <Button light onClick={refetch}>
        Retry again
      </Button>
    </div>
  </Row>
);

export default DisconnectedInternetState;
