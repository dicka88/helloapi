import {
  Button, FormElement, Input, Modal, Spacer, Text,
} from '@nextui-org/react';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { BsTrash } from 'react-icons/bs';
import { deleteProject } from '../../services/project.service';

type Props = {
  projectName: string,
  prefixPath: string
}

const DropdownProjectSettings: React.FC<Props> = ({ prefixPath, projectName }) => {
  const navigate = useNavigate();

  const [validation, setValidation] = useState<string>();
  const [modalRemoveOpen, setModalRemoveOpen] = useState<boolean>(false);

  const handleRemoveProject = async (): Promise<void> => {
    try {
      await deleteProject(prefixPath);

      toast.success('Project is removed');
      navigate('/projects');
    } catch (err: any) {
      toast.error('Something is wrong, please try again later');
    }
  };

  return (
    <div>
      <Button light color="error" onClick={() => setModalRemoveOpen(true)} icon={<BsTrash size={18} />}>
        Delete project
      </Button>
      <Modal open={modalRemoveOpen} onClose={() => setModalRemoveOpen(false)}>
        <Modal.Header>
          <Text h3>
            Are you sure to remove this project ?
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>
            Be sure and enter your project name
            {' '}
            <Text weight="bold" css={{ display: 'inline' }}>{projectName}</Text>
            {' '}
            to confirm
          </Text>
          <Spacer y={0.2} />
          <Input
            value={validation}
            placeholder={`Enter ${projectName}`}
            onChange={(e: ChangeEvent<FormElement>) => setValidation(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="error" disabled={validation !== projectName} onClick={handleRemoveProject}>Remove now</Button>
          <Button auto light onClick={() => setModalRemoveOpen(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DropdownProjectSettings;
