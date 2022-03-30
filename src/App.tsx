import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Col,
  Container,
  createTheme,
  Divider,
  Grid,
  Input,
  Link,
  NextUIProvider,
  Radio,
  Row,
  Spacer,
  Text,
  Textarea,
  Tooltip,
} from '@nextui-org/react';
import useDarkMode from 'use-dark-mode';
import { BsArrowLeft } from 'react-icons/bs';

import ListEndpoint from './components/ListEndpoint';
import MethodLabel from './components/ListEndpoint/MethodLabel';
import FakerSelect from './components/FakerSelect';

const App = () => {
  const lightTheme = createTheme({
    type: 'light',
  });
  const darkTheme = createTheme({
    type: 'dark',
  });

  const [modeActive, setModeActive] = useState('json');

  const darkMode = useDarkMode(false);

  const onModeChange = (value: string | number): void => {
    setModeActive(value as string);
  };

  return (
    <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
      <Container lg>
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

        <Grid.Container>
          <Row css={{ mb: 16, alignItems: 'center' }} align="center">
            <BsArrowLeft style={{ marginRight: '1em' }} />
            <Avatar
              src="https://www.freepnglogos.com/uploads/logo-tokopedia-png/logo-tokopedia-15.png"
              size="md"
              css={{ mr: 8 }}
            />
            <Text h3 css={{ ml: 8, mb: 0 }}>
              Tokopedia
            </Text>
          </Row>
          <Row>
            <Col span={3} css={{ pr: 18 }}>
              <Card shadow css={{ height: '100%', py: 12 }}>
                <div>
                  <Button auto css={{ display: 'inline', mr: 8 }}>
                    Create
                  </Button>
                  <Button flat auto css={{ display: 'inline' }}>
                    Create
                  </Button>
                </div>
                <Divider css={{ my: 16 }} />
                <div>
                  <ListEndpoint method="GET">
                    User
                  </ListEndpoint>
                  <ListEndpoint method="POST">
                    Teachers
                  </ListEndpoint>
                  <ListEndpoint method="PUT">
                    Products
                  </ListEndpoint>
                  <ListEndpoint method="DELETE">
                    Invoices
                  </ListEndpoint>
                  <ListEndpoint method="DELETE">
                    Invoices
                  </ListEndpoint>
                  <ListEndpoint method="DELETE">
                    Invoices
                  </ListEndpoint>
                  <ListEndpoint method="DELETE">
                    Invoices
                  </ListEndpoint>
                  <ListEndpoint method="DELETE">
                    Invoices
                  </ListEndpoint>
                  <ListEndpoint method="DELETE">
                    Invoices
                  </ListEndpoint>
                  <ListEndpoint method="DELETE">
                    Invoices The All Of Data And the enddd
                  </ListEndpoint>
                  <ListEndpoint method="DELETE">
                    Invoices
                  </ListEndpoint>
                  <ListEndpoint method="DELETE">
                    Invoices
                  </ListEndpoint>
                  <ListEndpoint method="DELETE">
                    Invoices
                  </ListEndpoint>
                  <ListEndpoint method="DELETE">
                    Invoices
                  </ListEndpoint>
                  <ListEndpoint method="DELETE">
                    Invoices
                  </ListEndpoint>
                  <ListEndpoint method="POST">
                    Invoices
                  </ListEndpoint>
                </div>
              </Card>
            </Col>
            <Col span={9} css={{ pl: 18 }}>
              <div>
                <Text h3>
                  Get Users
                </Text>
                <Spacer y={1} />
                <Row>
                  <MethodLabel method="GET" />
                  <Input
                    placeholder="Path"
                    fullWidth
                  />
                </Row>
                <Link href="/">
                  https://createapi.io/api/7huh37j92h2f8029/users
                </Link>
                <Spacer y={1} />
                <Radio.Group row value="json" onChange={onModeChange}>
                  <Radio value="json" size="sm" css={{ display: 'inline' }}>JSON</Radio>
                  <Radio value="faker" size="sm" css={{ display: 'inline' }}>Faker</Radio>
                </Radio.Group>
                <Spacer y={1} />
                {modeActive === 'json' && <Textarea fullWidth value="{}" />}
                {modeActive === 'faker' && (
                <>
                  <Input labelPlaceholder="Count" type="number" />
                  <Text>
                    Schema
                  </Text>
                  <Row>
                    <Input placeholder="key" css={{ mr: 8 }} />
                    <FakerSelect value="internet.firstName" />
                  </Row>
                </>
                )}
                <Spacer y={1} />
                <Button auto css={{ display: 'inline', mr: 8 }}>
                  Save
                </Button>
                <Button auto light css={{ display: 'inline' }}>
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </Grid.Container>
      </Container>
    </NextUIProvider>
  );
};

export default App;
