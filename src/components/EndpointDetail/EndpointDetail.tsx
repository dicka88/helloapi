import React from 'react';
import {
  Text,
} from '@nextui-org/react';

import { useOutletContext, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { ProjectTypes, Endpoint } from '../../services/project.service';
import CreateAndEditEndpoint from '../CreateAndEditEndpoint/CreateAndEditEndpoint';

const EndpointDetail: React.FC = () => {
  const { path } = useParams();
  const project = useOutletContext<ProjectTypes>();

  const endpoint = project?.endpoints.find((e: Endpoint) => e.path === path);

  if (!endpoint) {
    return (
      <Text>
        Not found
      </Text>
    );
  }

  const onSuccess = () => {
    toast.success('Updated');
  };

  return (
    <CreateAndEditEndpoint
      mode="edit"
      initialData={endpoint}
      prefixPath={project.prefixPath}
      path={endpoint.path}
      onSuccess={onSuccess}
    />
  );
};

export default EndpointDetail;
