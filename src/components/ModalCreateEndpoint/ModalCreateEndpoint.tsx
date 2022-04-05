import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Link as NextLink,
  Button, Col, Input, Modal, Radio, Row, Spacer, Text,
} from '@nextui-org/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { BsPlus, BsX } from 'react-icons/bs';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/worker-json';

import { createEndpoint, Endpoint, Schema } from '../../services/project.service';
import { queryClient } from '../../App';
import MethodLabel from '../ListEndpoint/MethodLabel';
import FakerSelect, { Faker } from '../FakerSelect';

type Props = {
  prefixPath: string,
  open: boolean;
  onClose: () => void;
}

interface SchemaField {
  key: string;
  value: string
}

const ModalCreateEndpoint: React.FC<Props> = ({ open, onClose, prefixPath }) => {
  const navigate = useNavigate();
  const {
    register, unregister, handleSubmit, setValue, watch, formState: { errors, isSubmitting },
  } = useForm();
  const [modeActive, setModeActive] = useState<string>('json');
  const [schemaFields, setSchemaFields] = useState<SchemaField[]>([{
    key: '',
    value: '',
  }]);
  const [jsonData, setJsonData] = useState<string>('{ "message": "Hello world" }');

  register('type', { value: modeActive });
  register('data', { value: jsonData });

  const type = watch('type');
  const path = watch('path');

  const mutator = useMutation(createEndpoint, {
    onSuccess() {
      onClose();
      navigate(`/projects/${prefixPath}/${path}`);
    },
    onError() {

    },
    onSettled: () => {
      queryClient.invalidateQueries(['projects', prefixPath]);
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    mutator.mutate({
      prefixPath,
      body: data as Endpoint,
    });
  };

  const onModeChange = (value: string | number): void => {
    setModeActive(value as string);
    setValue('type', value as string);
  };

  const addSchemaField = () => {
    setSchemaFields([...schemaFields, {
      key: '',
      value: '',
    }]);
  };

  const removeSchemaField = (index: number) => {
    const schemas = schemaFields.filter((_, i: number) => i !== index);

    unregister(`schema.${index}`);
    setSchemaFields(schemas);
  };

  const jsonDataChanged = (value: string) => {
    setJsonData(value);
    setValue('data', value);
  };

  return (
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('name', { required: true })}
            placeholder="Name"
            fullWidth
          />
          {errors.name?.type === 'required' && <Text color="red">Name is required</Text>}

          <Spacer y={1} />

          <Row>
            <MethodLabel method="GET" />
            <div style={{ width: '100%' }}>
              <Input
                {...register('path', { required: true })}
                placeholder="Path"
                fullWidth
              />
              {errors.path?.type === 'required' && <Text color="red">Path is required</Text>}
            </div>
          </Row>
          <NextLink href="/">
            {`${process.env.REACT_APP_API_HOST}/api/${prefixPath}/${path || ''}`}
          </NextLink>
          <Spacer y={1} />
          <Radio.Group row initialValue="json" value={type} onChange={onModeChange}>
            <Radio value="json" size="sm" css={{ display: 'inline' }}>JSON</Radio>
            <Radio value="faker" size="sm" css={{ display: 'inline' }}>Faker</Radio>
          </Radio.Group>
          <Spacer y={1} />
          {modeActive === 'json' && (
            <>
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
                  padding: '5px',
                  background: '#f4f4f4',
                  borderRadius: '12px',
                }}
                onLoad={(editor: any) => {
                  editor.renderer.setPadding(20);
                  editor.renderer.setScrollMargin(20);
                }}
                value={jsonData}
                onChange={jsonDataChanged}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: false,
                  tabSize: 2,
                }}
              />
              {errors.data?.type === 'required' && <Text color="red">JSON is required</Text>}
            </>
          )}
          {modeActive === 'faker' && (
          <Row>
            <Col span={12}>
              <div style={{ marginBottom: '1em' }}>
                <Text>
                  Data Count
                  <Text color="gray" css={{ display: 'inline' }}> (optional)</Text>
                </Text>
                <Input
                  placeholder="Count"
                  min={0}
                  type="number"
                  {...register('count', {
                    min: 0,
                    max: 50,
                  })}
                />
                {errors.count && <Text color="error">{errors.count.message}</Text>}
                {errors.count?.type === 'max' && <Text color="error">Max count is 50</Text>}
              </div>
              <div style={{ marginBottom: '1em' }}>
                <Text>
                  Schema
                </Text>
                {schemaFields.map((schema: Schema, i: number) => (
                  <Row css={{ mb: 8 }}>
                    <Input placeholder="Key" css={{ mr: 8, width: 'stretch' }} {...register(`schema.${i}.key`, { required: true })} />
                    <div>
                      <FakerSelect
                        value={watch(`schema.${i}.value`)}
                        onChange={(faker: Faker) => setValue(`schema.${i}.value`, faker.value)}
                      />
                    </div>
                    <Button auto light onClick={() => removeSchemaField(i)} css={{ visibility: i === 0 ? 'hidden' : 'inherit' }}>
                      <BsX />
                    </Button>
                  </Row>
                ))}
              </div>
              <Button flat auto onClick={addSchemaField}>
                <BsPlus />
              </Button>
            </Col>
          </Row>
          )}
          <Spacer y={1} />
          <Button type="submit" css={{ width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create'}
          </Button>
        </form>
        <Spacer y={1} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalCreateEndpoint;
