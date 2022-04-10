import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Button, Container, Row, Spacer, Text, Tooltip,
} from '@nextui-org/react';
import {
  BsArrowLeft, BsBoxArrowInUpRight, BsPencil, BsThreeDots,
} from 'react-icons/bs';
import styled from 'styled-components';
import AceEditor, { IAnnotation } from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/worker-json';

import toast from 'react-hot-toast';
import {
  createDocument,
  createPublicDocument, getDocument, getPublicDocument, updateDocument, updatePublicDocument,
} from '../services/document.service';
import Navbar from '../components/Navbar/Navbar';
import Seo from '../components/Seo/Seo';
import NavbarHomepage from '../components/NavbarHomepage/NavbarHomepage';
import Footer from '../components/Footer/Footer';
import DropdownDocument from '../components/DropdownDocument/DropdownDocument';

const PlainInput = styled.input`
  border: none;
  background: transparent;
  font-size: 2.25rem;
  font-weight: bold;
  max-width: 300px;
`;

type Props = {
  isPublic?: boolean;
}

const DocumentDetail: React.FC<Props> = ({ isPublic = null }) => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const { isLoading, data: document } = useQuery(['documents', id], () => {
    if (isPublic) return getPublicDocument(id!);
    if (id !== 'new') return getDocument(id!);

    return null;
  });
  const [aceError, setAceError] = useState<IAnnotation[]>([]);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [form, setForm] = useState<{
    content: string;
    title: string;
  }>({
    title: document?.title || 'Untitled',
    content: document?.content || '{ "message": "hello world" }',
  });

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      title: e.target.value,
    });
  };

  const saveHandler = async (): Promise<void> => {
    setSaveLoading(true);

    try {
      if (id === 'new') {
        if (isPublic) {
          const data = await createPublicDocument(form);
          navigate(`/document/${data._id}`);
        } else {
          const data = await createDocument(form);
          navigate(`/documents/${data._id}`);
        }
      } else if (id !== undefined) {
        if (isPublic) {
          await updatePublicDocument({
            id,
            body: form,
          });
        } else {
          await updateDocument({
            id,
            body: form,
          });
        }

        toast.success('Document is saved');
      }
    } catch (err: any) {
      toast.error("Can't save document");
    } finally {
      setSaveLoading(false);
    }
  };

  useEffect(() => {
    if (document) {
      setForm({
        title: document.title,
        content: document.content,
      });
    }
  }, [document]);

  return (
    <Container lg>
      <Seo title="Document - Hello API" />

      {isPublic && (
        <NavbarHomepage />
      )}
      {!isPublic && (
        <Navbar />
      )}

      <Spacer y={2} />

      {isLoading && (
        <Text>Loading...</Text>
      )}

      {!isLoading && (
      <>
        <Row justify="space-between">
          <div>
            <Row align="center">
              {!isPublic && (
                <div>
                  <Link to="/documents">
                    <BsArrowLeft size={18} style={{ display: 'inline', marginRight: '1em' }} />
                  </Link>
                </div>
              )}
              <div>
                <PlainInput
                  value={form.title}
                  onChange={titleChangeHandler}
                />
                <BsPencil size={18} style={{ marginLeft: '1em' }} />
              </div>
            </Row>
          </div>
          <div>
            <Row>
              <Button auto disabled={aceError.length > 0 || saveLoading} onClick={saveHandler}>
                {!saveLoading && aceError.length > 0 && 'Can\'t save'}
                {!saveLoading && aceError.length === 0 && 'Save'}
                {saveLoading && 'Saving ...'}
              </Button>
              <a href={`${process.env.REACT_APP_API_HOST}/api/${document?._id}`} target="_blank" rel="noreferrer">
                <Button light auto iconRight={<BsBoxArrowInUpRight size={18} />}>
                  Open
                </Button>
              </a>
              {!isPublic && (
                <Tooltip trigger="click" placement="bottomEnd" content={<DropdownDocument documentId={id!} />}>
                  <Button light auto>
                    <BsThreeDots />
                  </Button>
                </Tooltip>
              )}
            </Row>
          </div>
        </Row>

        <Spacer y={2} />

        {aceError.length > 0 && (
        <Text color="error">{aceError[0].text}</Text>
        )}
        <div style={{
          backgroundColor: '#f4f4f4',
          borderRadius: '12px',
          padding: '1em',
          minHeight: '200px',
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
            height="100%"
            value={form.content}
            onChange={(value) => setForm({ ...form, content: value })}
            style={{
              padding: '5px',
              background: '#f4f4f4',
              borderRadius: '12px',
              height: '200px',
            }}
            onValidate={(annotations) => { setAceError(annotations as IAnnotation[]); }}
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
        <Spacer y={4} />
        <Footer />
      </>
      )}

    </Container>
  );
};

export default DocumentDetail;
