import React, { useState } from 'react';
import {
  Button, Input, Modal, Spacer, Text, Textarea,
} from '@nextui-org/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { createProject, CreateProjectProps, GetAllProjectResponse } from '../../services/project.service';
import { queryClient } from '../../App';

type Props = {
  open: boolean;
  onClose: () => void;
}

const ModalCreateProject = ({ open, onClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const mutator = useMutation(createProject, {
    async onMutate() {
      setSubmitLoading(true);
    },
    onSuccess(data) {
      const projects = queryClient.getQueryData('projects') as GetAllProjectResponse;
      setSubmitLoading(false);
      queryClient.setQueryData('projects', {
        ...projects,
        data: [...projects.data, data],
      });
      onClose();
    },
    // onError(err, userUpdates, context:) {
    //   queryClient.setQueryData(['projects', context.userUpdates.id], context.previousUser);
    // },
    onSettled: () => {
      queryClient.invalidateQueries('projects');
    },
  });

  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    mutator.mutate(data as CreateProjectProps);
  };

  return (
    <Modal
      closeButton
      open={open}
      onClose={onClose}
    >
      <Modal.Header>
        <Text b size={22}>
          Create Project
        </Text>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('name', { required: true })}
            fullWidth
            color="primary"
            size="lg"
            placeholder="Project Name"
          />
          {errors.name?.type === 'required' && <Text color="red">Project name is required</Text>}
          <Spacer y={1} />
          <Textarea
            fullWidth
            {...register('description')}
            placeholder="Project Description (optional)"
          />
          <Spacer y={1} />
          <Button type="submit" css={{ width: '100%' }} disabled={submitLoading}>
            {submitLoading ? 'Creating...' : 'Create'}
          </Button>
        </form>
        <Spacer y={1} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalCreateProject;