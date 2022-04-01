import axios from './axiosInstance';
import { API_HOST } from '../config/env';

type Endpoint = {
  _id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  type: 'json' | 'string';
  hit: number;
  schema: Object;
  data: any;
  createdAt: string;
}

export type ProjectTypes = {
  _id: string;
  userId: string;
  collaborators: string[];
  projectName: string;
  projectDescription: string;
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

export const deleteProject = async (id: string): Promise<BasicResponse> => {
  const { data } = await axios.delete(`${API_HOST}/project/${id}`);

  return data;
};
