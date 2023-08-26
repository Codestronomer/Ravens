import useSWR from 'swr';
import axios, { AxiosResponse } from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

function useUser(id: string) {
  const { data, error, isLoading } = useSWR(`/api/get/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error
  };
}

export async function axiosPost(url: string, body: string) {
  const response = await axios.post(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  if (response.status >= 400) {
    let message;
    if (response.data.message) {
      message = response.data.message;
    } else {
      message = response;
    }
    return { error: true, message };
  }

  return response.data;
}