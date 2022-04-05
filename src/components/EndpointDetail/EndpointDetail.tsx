import React, { useEffect, useState } from 'react';
import {
  Button, Col, Divider, Input, Radio, Row, Spacer, Text, FormElement,
} from '@nextui-org/react';
import { BsPlus } from 'react-icons/bs';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/worker-json';

import MethodLabel from '../ListEndpoint/MethodLabel';
import FakerSelect, { Faker } from '../FakerSelect';
import { ProjectTypes, Endpoint } from '../../services/project.service';

interface SchemaField {
  key: string;
  value: string
}

const mapArrayToObject = (arr: Array<{key: string, value: string}>): object => {
  let obj = {};
  arr.forEach(({ key, value }) => {
    const newKey = {
      [key]: value,
    };

    obj = {
      ...obj,
      ...newKey,
    };
  });

  return obj;
};

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

  const [modeActive, setModeActive] = useState<string>('json');
  const [schemaFields, setSchemaFields] = useState<SchemaField[]>([{
    key: '',
    value: '',
  }]);

  const {
    register, handleSubmit, setValue, watch, formState: { errors },
  } = useForm();

  const jsonData = watch('data');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const datax = {
      ...data,
      type: modeActive,
      schema: mapArrayToObject(schemaFields),
    };

    console.log(datax);
  };

  const onModeChange = (value: string | number): void => {
    setModeActive(value as string);
  };

  const handleSchemaKeyChange = (i: number, e: React.ChangeEvent<FormElement>) => {
    const { value } = e.target;

    const newObject = [...schemaFields];
    newObject[i].key = value;
    setSchemaFields(newObject);
  };

  const handleSchemaValueChange = (i: number, option: Faker) => {
    const { value } = option;

    const newObject = [...schemaFields];
    newObject[i].value = value as string;
    setSchemaFields(newObject);
  };

  const addSchemaField = () => {
    setSchemaFields([...schemaFields, {
      key: '',
      value: '',
    }]);
  };

  useEffect(() => {
    if (endpoint) {
      Object.entries(endpoint).forEach((data: string[]) => {
        const [key, value] = data;
        setValue(key, value);
      });

      setModeActive(endpoint.type);
      setSchemaFields(endpoint.schema);
    }
  }, [endpoint]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text h3>
        {endpoint.name}
      </Text>
      <Spacer y={1} />
      <Row align="center">
        <MethodLabel method="GET" />
        <Input
          {...register('path', { required: true })}
          placeholder="Path"
          fullWidth
        />
      </Row>
      <a href={`${process.env.REACT_APP_API_HOST}/api/${project.prefixPath}/${path}`} target="_blank" rel="noreferrer">
        {`${process.env.REACT_APP_API_HOST}/api/${project.prefixPath}/${path}`}
      </a>
      <Spacer y={1} />
      <Radio.Group row value="json" onChange={onModeChange}>
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
            height="300px"
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
            onChange={(value: string) => setValue('data', value)}
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
        <Col span={6}>
          <div style={{ marginBottom: '1em' }}>
            <Text>
              Data Count
              <Text color="gray" css={{ display: 'inline' }}> (optional)</Text>
            </Text>
            <Input
              placeholder="Count"
              type="number"
              {...register('count', {
                min: 0, max: 50,
              })}
            />
            {errors.count && <Text color="error">{errors.count.message}</Text>}
          </div>
          <div style={{ marginBottom: '1em' }}>
            <Text>
              Schema
            </Text>
            {schemaFields.map(({ key, value }: SchemaField, i: number) => (
              <Row key={key} css={{ mb: 8 }}>
                <Input placeholder="Key" value={key} css={{ mr: 8 }} onChange={(e) => handleSchemaKeyChange(i, e)} />
                <div>
                  <FakerSelect
                    value={value}
                    name={key}
                    onChange={(option: any) => handleSchemaValueChange(i, option)}
                  />
                </div>
              </Row>
            ))}
          </div>
          <Button flat auto onClick={addSchemaField}>
            <BsPlus />
          </Button>
        </Col>
      </Row>
      )}
      <Divider css={{ my: 8 }} />
      <Spacer y={1} />
      <Button type="submit" auto css={{ display: 'inline', mr: 8 }}>
        Save
      </Button>
      <Link to={`/projects/${project.prefixPath}`}>
        <Button auto light css={{ display: 'inline' }}>
          Cancel
        </Button>
      </Link>
    </form>
  );
};

export default EndpointDetail;
