import useSWR from 'swr';
import axios, { AxiosResponse } from 'axios';
import { User } from '@/context/authContext';

export const baseUrl = 'http://localhost:5000';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

function useUser(id: string) {
  const { data, error, isLoading } = useSWR(`${baseUrl}/users/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error
  };
}

export async function axiosPost(url: string, body: User) {
  try {
    const response = await axios.post(url,
      body, {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log(response);

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
  } catch (error) {
    return { error: true, message: 'An error occurred.' };
  }
}