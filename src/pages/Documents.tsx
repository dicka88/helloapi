import {
  Button,
  Container, Grid, Image, Row, Spacer, Text,
} from '@nextui-org/react';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
// import Skeleton from 'react-loading-skeleton';

import { BsArrowRight } from 'react-icons/bs';
import Skeleton from 'react-loading-skeleton';
import { AiOutlinePlus } from 'react-icons/ai';
import Navbar from '../components/Navbar/Navbar';
import MenuTabs from '../components/MenuTabs/MenuTabs';
import { getAllDocument } from '../services/document.service';
import Seo from '../components/Seo/Seo';

const Documents: React.FC = () => {
  const { isLoading, data } = useQuery('documents', getAllDocument);

  return (
    <Container lg>
      <Seo
        title="Documents - Hello API"
      />

      <Navbar />

      <MenuTabs />

      <Grid.Container css={{ mt: '$10' }}>
        {data && data?.length > 0 && (
          <Grid xs={12} justify="flex-end">
            <Link to="/documents/new">
              <Button auto>
                <AiOutlinePlus style={{ marginRight: '0.5rem' }} />
                Create New Document
              </Button>
            </Link>
          </Grid>
        )}

        <Spacer y={1} />

        {isLoading && (
          [...Array(7)].map((index) => (
            <Grid key={index} xs={12}>
              <Row justify="space-between" css={{ mb: '$1' }}>
                <div>
                  <Skeleton height={24} width={512} />
                </div>
                <Skeleton height={24} width={24} />
              </Row>
            </Grid>
          ))
        )}

        {data?.length === 0 && (
          <Grid xs={12} justify="center" alignItems="center" css={{ py: '$24' }}>
            <div style={{ textAlign: 'center' }}>
              <Image
                src="/illustrations/miroodles-colorcamp2.png"
                height="320px"
                css={{ pb: '$14' }}
              />
              <Text h3>No have any document</Text>
              <Spacer y={1} />
              <Link to="/documents/new">
                <Button auto css={{ mx: 'auto' }}>
                  <AiOutlinePlus style={{ marginRight: '0.5rem' }} />
                  Create New Document
                </Button>
              </Link>
            </div>
          </Grid>
        )}

        {data?.map(({ title, _id }) => (
          <Grid key={_id} xs={12}>
            <Row justify="space-between" css={{ mb: '$1', '&:hover': { color: '$blue700' } }}>
              <Link to={`/documents/${_id}`} style={{ width: '100%' }}>
                <Row justify="space-between" align="center">
                  <span>
                    {title}
                  </span>
                  <Button auto flat>
                    <BsArrowRight />
                  </Button>
                </Row>
              </Link>
            </Row>
          </Grid>
        ))}
      </Grid.Container>

    </Container>
  );
};

export default Documents;
