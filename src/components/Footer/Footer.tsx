import React from 'react';
import {
  Button, Row, Spacer, Text,
} from '@nextui-org/react';
import { BsGithub, BsTwitter } from 'react-icons/bs';

const Footer: React.FC = () => (
  <footer style={{ width: '100%' }}>
    <Row justify="center" css={{ py: '$18', borderTop: '1px solid #e8e8e8' }}>
      <div style={{ textAlign: 'center' }}>
        <Row justify="center">
          <a href="https://github.com/dicka88/helloapi-frontend">
            <Button light auto>
              <BsGithub size={24} />
            </Button>
          </a>
          <a href="https://twitter.com/dickaismaji">
            <Button light auto>
              <BsTwitter size={24} />
            </Button>
          </a>
        </Row>
        <Spacer y={1} />
        <Text weight="bold">
          Hello API 2022
        </Text>
      </div>
    </Row>
  </footer>
);

export default Footer;
