import React, { useState } from 'react';
import {
  Image,
  Button, Container, Grid, Row, Spacer, Text, Collapse,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import AceEditor from 'react-ace';

import Footer from '../components/Footer/Footer';
import Seo from '../components/Seo/Seo';
import NavbarHomepage from '../components/NavbarHomepage/NavbarHomepage';
import { createPublicDocument } from '../services/document.service';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState(JSON.stringify({ statusCode: 200, message: 'Hello API' }, null, '\t'));
  const createApiHandler = async () => {
    const data = {
      title: 'Hello World',
      content,
    };

    const document = await createPublicDocument(data);

    navigate(`/document/${document._id}`);
  };

  return (
    <>
      <Container lg>
        <Seo
          title="Hello API | Create your API without Coding"
          description="Fake API Json with faker or just plain json"
        />

        <NavbarHomepage />

        <section>
          <Grid.Container css={{ py: '$16', pb: '$24' }}>
            <Grid xs={12} sm={6} md={6}>
              <Row justify="center" align="center">
                <div>
                  <Text h2 css={{ display: 'block' }}>
                    Generate your API using
                    {' '}
                    <br />
                    {' '}
                    existing JSON
                  </Text>
                  <Spacer y={2} />
                  <div style={{
                    backgroundColor: '#f4f4f4',
                    borderRadius: '12px',
                    padding: '1em',
                  }}
                  >
                    <AceEditor
                      placeholder="Enter your JSON"
                      mode="json"
                      theme="xcode"
                      name="blah2"
                      fontSize="1rem"
                      showPrintMargin={false}
                      showGutter={false}
                      highlightActiveLine={false}
                      width="100%"
                      height="200px"
                      style={{
                        background: '#f4f4f4',
                      }}
                      value={content}
                      onChange={(val: string) => setContent(val)}
                      setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: false,
                        tabSize: 2,
                        wrap: true,
                      }}
                    />
                  </div>
                  <Spacer y={1} />
                  <Row>
                    <Button auto css={{ marginRight: '$4' }} onClick={createApiHandler}>
                      Create JSON
                    </Button>
                    <Button auto flat>
                      Get Started
                    </Button>
                  </Row>
                </div>
              </Row>
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <Row justify="center" align="center">
                <Image src="/illustrations/sammy-no-connection.gif" alt="HelloAPI" />
              </Row>
            </Grid>
          </Grid.Container>
        </section>

        <section>
          <Grid.Container css={{ py: '$24' }}>
            <Grid xs={12} sm={4} md={4} justify="center" css={{ mb: '$12' }}>
              <div>
                <Text h4 css={{ marginBottom: '0.55em' }}>Built for developer</Text>
                <Text>
                  Its free, serve any json data from anywhere,
                  <br />
                  any time, and its okay
                </Text>
              </div>
            </Grid>
            <Grid xs={12} sm={4} md={4} justify="center" css={{ mb: '$12' }}>
              <div>
                <Text h4 css={{ marginBottom: '0.55em' }}>Unlimited API to create</Text>
                <Text>
                  Yes, its unlimited if you pay
                  <br />
                  Just kid, this is still beta so we didn't set any plan
                </Text>
              </div>
            </Grid>
            <Grid xs={12} sm={4} md={4} justify="center" css={{ mb: '$12' }}>
              <div>
                <Text h4 css={{ marginBottom: '0.55em' }}>Unlimited Bandwidth</Text>
                <Text>
                  Why API is should limited ?
                  <br />
                  Break your limit :)
                </Text>
              </div>
            </Grid>

          </Grid.Container>
        </section>

        <section>
          <Grid.Container css={{ py: '$24' }}>
            <Grid sm={12} md={6}>
              <Image
                src="/illustrations/miroodles-colorcamp4.png"
                width={280}
              />
            </Grid>
            <Grid sm={12} md={6}>
              <Collapse.Group>
                <Collapse title="Option A" expanded>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </Text>
                </Collapse>
                <Collapse title="Option B">
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </Text>
                </Collapse>
                <Collapse title="Option C">
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </Text>
                </Collapse>
              </Collapse.Group>
            </Grid>
          </Grid.Container>
        </section>

        <section>
          <Grid.Container css={{ py: '$24' }}>
            <Grid sm={12} justify="center" css={{ mb: '$16' }}>
              <Text h4>
                Thanks for helping developer to code until deploy this site
              </Text>
            </Grid>
            <Grid xs={6} sm={3} justify="center" css={{ mb: '$12' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png" height={45} alt="" />
            </Grid>
            <Grid xs={6} sm={3} justify="center" css={{ mb: '$12' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" height={35} alt="" />
            </Grid>
            <Grid xs={6} sm={3} justify="center" css={{ mb: '$12' }}>
              <img src="https://wizardsourcer.com/wp-content/uploads/2019/03/Stackoverflow.png" height={45} alt="" />
            </Grid>
            <Grid xs={6} sm={3} justify="center" css={{ mb: '$12' }}>
              <img src="https://logos-world.net/wp-content/uploads/2020/11/GitHub-Emblem.png" height={45} alt="" />
            </Grid>
          </Grid.Container>
        </section>

      </Container>

      <Footer />
    </>
  );
};

export default Index;
