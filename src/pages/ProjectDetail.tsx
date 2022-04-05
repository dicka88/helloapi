import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Col,
  Container,
  Divider,
  Grid,
  Row,
  Spacer,
  Text,
  Tooltip,
} from '@nextui-org/react';
import { BsArrowLeft, BsGear, BsKey } from 'react-icons/bs';
import {
  Link, Outlet, useOutlet, useParams,
} from 'react-router-dom';
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';

import ListEndpoint from '../components/ListEndpoint';
import Navbar from '../components/Navbar/Navbar';
import { getProject } from '../services/project.service';
import AvatarShortName from '../components/AvatarShortName/AvatarShortName';
import NotFound from './errors/NotFound';
import ModalCreateEndpoint from '../components/ModalCreateEndpoint/ModalCreateEndpoint';
import DropdownProjectSettings from '../components/DropdownProjectSettings/DropdownProjectSettings';
import ModalApiKey from '../components/ModalApiKey/ModalApiKey';
import DisconnectedInternetState from '../components/DisconnectedInternetState/DisconnectedInternetState';

const ProjectDetail: React.FC = () => {
  const { prefixPath } = useParams<{prefixPath: string}>();
  const outlet = useOutlet();
  const [modalCreateOpen, setModalCreateOpen] = useState<boolean>(false);
  const [modalApiKeyOpen, setModalApiKeyOpen] = useState<boolean>(false);

  const {
    isLoading, data: project, isError, refetch,
  } = useQuery(['projects', prefixPath], () => getProject(prefixPath!));

  if (isError) {
    return (
      <DisconnectedInternetState refetch={refetch} />
    );
  }

  if (!isLoading && !project) {
    return (
      <NotFound />
    );
  }

  return (
    <Container lg>
      <Navbar />

      <Grid.Container>
        <Row justify="space-between" align="center">
          <Row css={{ mb: 16, alignItems: 'center' }} align="center">
            <Link to="/projects">
              <Row css={{
                py: 8, px: 8, borderRadius: '12px', alignItems: 'center', '&:hover': { background: '$gray100' },
              }}
              >
                <BsArrowLeft style={{ marginRight: '1em' }} />
                {isLoading && (
                <Skeleton circle height={43} width={43} />
                )}
                {!isLoading && project?.avatarUrl && (
                <Avatar
                  src={project.avatarUrl}
                  size="md"
                  css={{ mr: 8, cursor: 'pointer' }}
                />
                )}
                {!isLoading && !project?.avatarUrl && (
                <AvatarShortName name={project?.projectName || ''} />
                )}
              </Row>
            </Link>
            {isLoading ? (
              <Skeleton height={25} width={130} />
            ) : (
              <Text h3 css={{ ml: 8, mb: 0 }}>
                {project?.projectName}
              </Text>
            )}
          </Row>
          {isLoading ? (
            <>
              <Skeleton height={40} width={120} style={{ marginRight: '1em' }} />
              <Skeleton height={40} width={40} />
            </>
          ) : (
            <>
              <Button auto ghost ripple borderWeight="light" color="primary" icon={<BsKey />} onClick={() => setModalApiKeyOpen(true)}>
                Api key
              </Button>
              <Tooltip placement="bottomEnd" trigger="click" content={<DropdownProjectSettings prefixPath={prefixPath!} projectName={project.projectName} />}>
                <Button auto light ripple>
                  <BsGear size={22} />
                </Button>
              </Tooltip>
            </>
          )}
        </Row>
        <Row>
          <Col span={3} css={{ pr: 18 }}>
            <Card shadow css={{ height: '100%', py: 12 }}>
              <div>
                {isLoading
                  ? <Skeleton height={38} width={75} />
                  : (
                    <Button auto css={{ display: 'inline', mr: 8 }} onClick={() => setModalCreateOpen(true)}>
                      Create
                    </Button>
                  )}
              </div>
              <Divider css={{ my: 16 }} />
              <div>
                {isLoading && (
                  [1, 2, 3, 4, 5, 6, 7, 8].map((i: number) => (
                    <div key={i} style={{ width: '100%', marginBottom: '0.5em', opacity: `${(10 - i) * 10}%` }}>
                      <Skeleton height={30} enableAnimation />
                    </div>
                  ))
                )}
                {!isLoading && project?.endpoints?.length === 0 && (
                  <Text>No one endpoints</Text>
                )}
                {!isLoading && project?.endpoints.map((endpoint) => (
                  <div style={{ marginBottom: '0.5em' }}>
                    <ListEndpoint
                      key={endpoint._id}
                      method={endpoint.method}
                      link={`/projects/${prefixPath}/${endpoint.path}`}
                      prefixPath={project.prefixPath}
                      path={endpoint.path}
                    >
                      {endpoint.name}
                    </ListEndpoint>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          <Col span={9} css={{ pl: 18 }}>
            {isLoading && outlet && (
              <div>
                <Skeleton height={30} width={100} />
                <div style={{ width: '100%' }}>
                  <Skeleton height={30} />
                </div>
                <Skeleton height={15} width={400} />
                <Row>
                  <Skeleton height={30} width={100} style={{ marginRight: '1em' }} />
                  <Skeleton height={30} width={100} />
                </Row>
                <div style={{ width: '100%' }}>
                  <Skeleton height={200} />
                </div>
                <Row>
                  <Skeleton height={36} width={95} style={{ marginRight: '1em' }} />
                  <Skeleton height={36} width={95} />
                </Row>
              </div>
            )}
            {isLoading && !outlet && (
              <Row justify="center">
                <div>
                  <Skeleton height={230} width={230} style={{ marginBottom: '3em' }} />
                  <Skeleton height={36} width={260} />
                </div>
              </Row>
            )}
            {!isLoading && !outlet && (
              <Row justify="center" align="center">
                <div style={{ textAlign: 'center' }}>
                  <img src="/miroodles-colorcamp.png" height="250px" alt="Illustration" />
                  <Spacer y={2} />
                  <Text h4>
                    Everything is look good
                  </Text>
                </div>
              </Row>
            )}
            {outlet && !isLoading && <Outlet context={project} /> }
          </Col>
        </Row>
      </Grid.Container>

      <ModalCreateEndpoint
        open={modalCreateOpen}
        onClose={() => setModalCreateOpen(false)}
        prefixPath={prefixPath!}
      />

      <ModalApiKey
        open={modalApiKeyOpen}
        onClose={() => setModalApiKeyOpen(false)}
        prefixPath={prefixPath!}
        apiKey={project?.apiKey!}
      />
    </Container>
  );
};

export default ProjectDetail;
