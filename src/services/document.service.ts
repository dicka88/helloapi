import axios from './axiosInstance';

type DocumentCreateType = {
  title: string,
  content: any
}

type Document = {
  _id: string,
  title: string,
  userId: string | null,
  content: any,
  createdAt: string
}

export const getPublicDocument = async (id: string): Promise<Document> => {
  const { data } = await axios.get(`/documents/public/${id}`);
  return data;
};

export const createPublicDocument = async (body: DocumentCreateType): Promise<Document> => {
  const { data } = await axios.post('/documents/public', body);
  return data;
};

export const getAllDocument = async (): Promise<Document[]> => {
  const { data } = await axios.get('/documents');
  return data;
};

export const getDocument = async (id: string): Promise<Document> => {
  const { data } = await axios.get(`/documents/${id}`);
  return data;
};

export const createDocument = async (body: DocumentCreateType): Promise<Document> => {
  const { data } = await axios.post('/documents', body);
  return data;
};

type DocumentUpdateType = {
  id: string,
  body: {
    title: string,
    content: any
  }
}

export const updateDocument = async ({ id, body }: DocumentUpdateType): Promise<any> => {
  const { data } = await axios.put(`/documents/${id}`, body);
  return data;
};

export const updatePublicDocument = async ({ id, body }: DocumentUpdateType): Promise<any> => {
  const { data } = await axios.put(`/documents/public/${id}`, body);
  return data;
};

export const deleteDocument = async (id: string): Promise<{
  code: number,
  message: string
}> => {
  const { data } = await axios.delete(`/documents/${id}`);
  return data;
};
