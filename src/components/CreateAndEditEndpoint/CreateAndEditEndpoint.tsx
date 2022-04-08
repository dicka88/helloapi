import {
  Link as NextLink,
  Input, Radio, Row, Spacer, Text, Col, Button,
} from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { BsPlus, BsX } from 'react-icons/bs';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/worker-json';

import MethodLabel from '../ListEndpoint/MethodLabel';
import { queryClient } from '../../App';
import {
  createEndpoint, Endpoint, Schema, updateEndpoint,
} from '../../services/project.service';
import FakerSelect, { Faker } from '../FakerSelect';

type Props = {
  mode: 'edit' | 'create',
  prefixPath: string,
  path?: string,
  initialData?: Endpoint
  onSuccess?: () => void
}

interface SchemaField {
  key: string;
  value: string
}

const CreateAndEditEndpoint: React.FC<Props> = ({
  mode, prefixPath, path, onSuccess, initialData,
}) => {
  const navigate = useNavigate();
  const {
    register, unregister, handleSubmit, setValue, watch, formState: { errors, isSubmitting },
  } = useForm();
  const [typeActive, setTypeActive] = useState<string>('json');
  const [schemaFields, setSchemaFields] = useState<SchemaField[]>([{
    key: '',
    value: '',
  }]);
  const [jsonData, setJsonData] = useState<string>('{ "message": "Hello world" }');

  register('type', { value: typeActive });
  register('data', { value: jsonData });

  const type = watch('type');
  const pathValue = watch('path');

  const mutatorConfig = {
    onSuccess() {
      navigate(`/projects/${prefixPath}/${pathValue}`);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    },
    onError() {

    },
    onSettled: () => {
      queryClient.invalidateQueries(['projects', prefixPath]);
    },
  };

  const mutatorCreate = useMutation(createEndpoint, mutatorConfig);
  const mutatorUpdate = useMutation(updateEndpoint, mutatorConfig);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (mode === 'create') {
      mutatorCreate.mutate({
        prefixPath,
        body: data as Endpoint,
      });
    } else {
      mutatorUpdate.mutate({
        prefixPath,
        path: pathValue,
        body: data as Endpoint,
      });
    }
  };

  const onTypeChange = (value: string | number): void => {
    setTypeActive(value as string);
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

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach((data: string[]) => {
        const [key, value] = data;
        setValue(key, value);
      });

      setTypeActive(initialData.type);
      setJsonData(initialData.data);

      setSchemaFields(initialData.schema);
    }
  }, [initialData]);

  return (
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
      <Radio.Group row initialValue="json" value={type} onChange={onTypeChange}>
        <Radio value="json" size="sm" css={{ display: 'inline' }}>JSON</Radio>
        <Radio value="faker" size="sm" css={{ display: 'inline' }}>Faker</Radio>
      </Radio.Group>
      <Spacer y={1} />
      {type === 'json' && (
      <>
        <div style={{
          backgroundColor: '#f4f4f4',
          borderRadius: '12px',
          padding: '1em',
        }}
        >
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
            value={jsonData}
            onChange={jsonDataChanged}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: false,
              tabSize: 2,
              maxLines: Infinity,
              wrap: true,
            }}
          />
        </div>
        {errors.data?.type === 'required' && <Text color="red">JSON is required</Text>}
      </>
      )}
      {typeActive === 'faker' && (
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
                    value={watch(`schema.${i}.value` || schema.value)}
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
        {mode === 'create' && isSubmitting && 'Creating...'}
        {mode === 'create' && !isSubmitting && 'Create'}

        {mode === 'edit' && isSubmitting && 'Saving...'}
        {mode === 'edit' && !isSubmitting && 'Save'}
      </Button>
    </form>
  );
};

export default CreateAndEditEndpoint;
