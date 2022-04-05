import React, { useEffect, useState } from 'react';
import {
  Button, Modal, Row, Text,
} from '@nextui-org/react';
import { BsClipboard } from 'react-icons/bs';
import { toast } from 'react-hot-toast';

import { generateNewApiKey } from '../../services/project.service';

type Props = {
  open: boolean;
  onClose: () => void;
  prefixPath: string;
  apiKey: string;
}

const ModalApiKey: React.FC<Props> = ({
  open, onClose, prefixPath, apiKey,
}) => {
  const [currentApiKey, setCurrentApiKey] = useState<string>(apiKey);
  const generateNewKey = async (): Promise<void> => {
    try {
      const { apiKey: newApiKey } = await generateNewApiKey(prefixPath);
      setCurrentApiKey(newApiKey);
    } catch (err: any) {
      toast.error('Failed to generate new API key');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentApiKey);
    toast.success('Successfull copy API key to clipboard');
    onClose();
  };

  useEffect(() => {
    setCurrentApiKey(apiKey);
  }, [apiKey]);

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <h3>API Key</h3>
      </Modal.Header>
      <Modal.Body>
        <Row justify="space-between" align="center">
          <Text>
            {currentApiKey}
          </Text>
          <Button light auto onClick={copyToClipboard}>
            <BsClipboard />
          </Button>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={generateNewKey}>
          Re-Generate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalApiKey;
