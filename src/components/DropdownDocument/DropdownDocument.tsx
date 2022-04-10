import {
  Button, Modal, Spacer, Text,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { BsTrash } from 'react-icons/bs';
import { deleteDocument } from '../../services/document.service';

type Props = {
  documentId: string
}

const DropdownDocument: React.FC<Props> = ({ documentId }) => {
  const navigate = useNavigate();

  const [modalRemoveOpen, setModalRemoveOpen] = useState<boolean>(false);

  const handleRemoveProject = async (): Promise<void> => {
    try {
      await deleteDocument(documentId);

      toast.success('Project is removed');
      navigate('/documents');
    } catch (err: any) {
      toast.error('Something is wrong, please try again later');
    }
  };

  return (
    <div>
      <Button light color="error" onClick={() => setModalRemoveOpen(true)} icon={<BsTrash size={18} />}>
        Delete Document
      </Button>
      <Modal open={modalRemoveOpen} onClose={() => setModalRemoveOpen(false)}>
        <Modal.Header>
          <Text h3>
            Are you sure to remove this document ?
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>
            Be sure to remove this document
            {' '}
            <Text weight="bold" css={{ display: 'inline' }}>document cannot be restored again</Text>
          </Text>
          <Spacer y={0.2} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="error" onClick={handleRemoveProject}>Remove now</Button>
          <Button auto light onClick={() => setModalRemoveOpen(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DropdownDocument;
