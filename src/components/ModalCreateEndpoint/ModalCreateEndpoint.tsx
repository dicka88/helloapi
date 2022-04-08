import React from 'react';
import {
  Modal, Spacer, Text,
} from '@nextui-org/react';
import CreateAndEditEndpoint from '../CreateAndEditEndpoint/CreateAndEditEndpoint';

type Props = {
  prefixPath: string,
  open: boolean;
  onClose: () => void;
}

const ModalCreateEndpoint: React.FC<Props> = ({ open, onClose, prefixPath }) => (
  <Modal
    width="600px"
    closeButton
    open={open}
    onClose={onClose}
  >
    <Modal.Header>
      <Text b size={22}>
        Create API
      </Text>
    </Modal.Header>
    <Modal.Body>
      <CreateAndEditEndpoint
        mode="create"
        prefixPath={prefixPath}
        onSuccess={onClose}
      />
      <Spacer y={1} />
    </Modal.Body>
  </Modal>
);

export default ModalCreateEndpoint;
