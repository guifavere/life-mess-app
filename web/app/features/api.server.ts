import axios, { isAxiosError } from 'axios';
import { redirect } from '@remix-run/node';

interface ErrorResponse {
  data: { message: string; };
  status: number;
}

interface ErrorResponseWithErrors extends ErrorResponse {
  data: {
    errors: { [error: string]: string[] };
    message: string;
  };
}

export const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    if (isAxiosError(error) && error.response?.status === 401) {
      throw redirect('/login');
    }

    if (isAxiosError(error)) return Promise.reject(error.response);

    return Promise.reject(error);
  }
);

export const isErrorResponse = (error: unknown): error is ErrorResponse =>
  typeof error === 'object' &&
  error !== null &&
  'data' in error &&
  'status' in error;

export const isErrorResponseWithErrors = (
  error: unknown,
): error is ErrorResponseWithErrors =>
  isErrorResponse(error) && 'errors' in error.data;
