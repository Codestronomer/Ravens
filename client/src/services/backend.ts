import useSWR from 'swr';
import axios, { AxiosResponse } from 'axios';
import { User } from '@/context/authContext';

export const baseUrl = 'http://localhost:5000';

const fetcher = async (url: string) => await axios.get(url).then(res => res.data);

export function useUser(id: string) {
  const { data, error } = useSWR(`${baseUrl}/users/${id}`, fetcher);

  return {
    user: data,
    isError: error
  };
}

export function useChat(id: string) {
  const { data, error, } = useSWR(`${baseUrl}/chat/${id}`, fetcher);

  return {
    chat: data,
    isError: error
  }
}

export async function axiosGet(url: string) {
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.status >= 400) {
    let message = 'An error occured...';

    if (response.data?.message) {
      message = response.data.message;
    }

    return { error: true, message};
  }
  return response.data;
};

export async function axiosPost(url: string, body: any) {
  try {
    const response = await axios.post(url,
      body, {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status >= 400) {
      let message;
      if (response.data.message) {
        message = response.data.message;
      } else {
        message = response.statusText;
      }
      return { error: true, message };
    }

    return response.data;
  } catch (error: any) {
    return { error: true, message: error?.message };
  }
}

export async function axiosPut(url: string, body: any) {
  try {
    const response = await axios.put(url,
      body, {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status >= 400) {
      let message;
      if (response.data.message) {
        message = response.data.message;
      } else {
        message = response.statusText;
      }
      return { error: true, message };
    }

    return response.data;
  } catch (error: any) {
    return { error: true, message: error?.message };
  }
}