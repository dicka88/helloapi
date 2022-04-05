import axios from './axiosInstance';
import { API_HOST } from '../config/env';

export type Schema = {
  key: string,
  value: string
}

export type Endpoint = {
  _id?: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  type: 'json' | 'string';
  count: number;
  hit?: number;
  schema: Schema[];
  data: any;
  createdAt?: string;
}

export type ProjectTypes = {
  _id: string;
  userId: string;
  collaborators: string[];
  projectName: string;
  projectDescription: string;
  avatarUrl: string;
  apiKey: string;
  prefixPath: string;
  endpoints: Endpoint[];
}

export type GetAllProjectResponse = {
  statusCode: number;
  data: ProjectTypes[]
}

export const getAllProject = async (): Promise<GetAllProjectResponse> => {
  const { data } = await axios.get(`${API_HOST}/project`);

  return data;
};

export const getProject = async (id: string): Promise<ProjectTypes> => {
  const { data } = await axios.get(`${API_HOST}/project/${id}`);

  return data;
};

export type CreateProjectProps = {
  name: string;
  description: string;
}

export const createProject = async (body: CreateProjectProps): Promise<ProjectTypes> => {
  const { data } = await axios.post(`${API_HOST}/project`, body);

  return data;
};

type BasicResponse = {
  statusCode: number;
  message: string;
}

export const updateProject = async (
  id: string,
  body: CreateProjectProps,
): Promise<BasicResponse> => {
  const { data } = await axios.put(`${API_HOST}/project`, body);

  return data;
};

export const deleteProject = async (prefixPath: string): Promise<BasicResponse> => {
  const { data } = await axios.delete(`${API_HOST}/project/${prefixPath}`);

  return data;
};

export const generateNewApiKey = async (
  prefixPath: string,
): Promise<{statusCode: number, apiKey: string}> => {
  const { data } = await axios.post(`${API_HOST}/project/${prefixPath}/generate_key`);

  return data;
};

export type CreateEndpointProps = {
  prefixPath: string,
  body: Endpoint
}

export const createEndpoint = async ({ prefixPath, body }: CreateEndpointProps): Promise<any> => {
  const { data } = await axios.post(`${API_HOST}/project/${prefixPath}/endpoint`, body);

  return data;
};
export type UpdateEndpointProps = {
  prefixPath: string,
  path: string,
  body: Endpoint
}

export const updateEndpoint = async (
  { prefixPath, path, body }: UpdateEndpointProps,
): Promise<any> => {
  const { data } = await axios.put(`${API_HOST}/project/${prefixPath}/endpoint/${path}`, body);

  return data;
};

export const deleteEndpoint = async (prefixPath: string, endpointId: string): Promise<any> => {
  const { data } = await axios.delete(`${API_HOST}/project/${prefixPath}/endpoint/${endpointId}`);

  return data;
};
