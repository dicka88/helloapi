import {
  Avatar,
  Button,
  Card,
  Container, Grid, Row, Spacer, Text,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { AiOutlinePlus } from 'react-icons/ai';

import ModalCreateProject from '../components/ModalCreateProject/ModalCreateProject';
import Navbar from '../components/Navbar/Navbar';
import { getAllProject, ProjectTypes } from '../services/project.service';
import AvatarShortName from '../components/AvatarShortName/AvatarShortName';

const Project: React.FC = () => {
  const {
    isLoading, data,
  } = useQuery('projects', getAllProject);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <Container lg>
      <Navbar />

      <Row justify="space-between">
        <Text h3>Projects</Text>
        {data?.data.length !== 0 && (
        <Button auto onClick={() => setCreateModalOpen(true)}>
          <AiOutlinePlus style={{ marginRight: '0.5rem' }} />
          Create
        </Button>
        )}
      </Row>
      {data?.data.length === 0 && (
        <Row justify="center" css={{ py: '$32' }}>
          <div>
            <Text h2>No projects found</Text>
            <Text>Create your first Project now</Text>
            <Spacer y={1} />
            <Button auto onClick={() => setCreateModalOpen(true)}>
              <AiOutlinePlus style={{ marginRight: '0.5rem' }} />
              Create
            </Button>
          </div>
        </Row>
      )}
      <Grid.Container gap={1} css={{ my: 16 }}>
        { isLoading && (
          [1, 2, 3, 4, 5, 6].map((i:number) => (
            <Grid key={i} xs={6} sm={4} md={4} lg={3}>
              <Card shadow={false} bordered>
                <Row>
                  <div style={{ marginRight: '1em' }}>
                    <Skeleton circle height={40} width={40} enableAnimation />
                  </div>
                  <div>
                    <Skeleton height={15} width={120} enableAnimation />
                    <Skeleton height={10} width={150} enableAnimation />
                  </div>
                </Row>
              </Card>
            </Grid>
          ))
        )}
        {data?.data.map((project: ProjectTypes) => (
          <Grid key={project._id} xs={6} sm={4} md={4} lg={3}>
            <Link to={`/projects/${project.prefixPath}`} style={{ width: '100%' }}>
              <Card shadow={false} bordered css={{ height: '100%', '&:hover': { boxShadow: '$md' } }}>
                <Row css={{ py: '$6' }}>
                  <div style={{ marginRight: '1em' }}>
                    {project.avatarUrl && (
                      <Avatar
                        src={project.avatarUrl}
                        size="md"
                        css={{ mr: 8, cursor: 'pointer' }}
                      />
                    )}
                    {!project.avatarUrl && (
                      <AvatarShortName name={project.projectName} />
                    )}
                  </div>
                  <div>
                    <Text h4>
                      {project.projectName}
                    </Text>
                    <Text>
                      {project.projectDescription}
                    </Text>
                  </div>
                </Row>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid.Container>

      <ModalCreateProject open={createModalOpen} onClose={() => setCreateModalOpen(false)} />
    </Container>
  );
};

export default Project;
