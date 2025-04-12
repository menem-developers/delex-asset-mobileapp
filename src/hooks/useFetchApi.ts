import axios from 'axios';
import {BASE_URL} from '../utlis/endpoints';
import {useState} from 'react';

export enum HTTP {
  DELETE = 'delete',
  GET = 'get',
  POST = 'post',
  PUT = 'put',
}

type UseFetchApiOptions = {
  onError?: (data?: any) => void;
  onLoading?: (data: boolean) => void;
  onSuccess?: (data?: any) => void;
};

const useFetchApi = (options?: UseFetchApiOptions) => {
  const {onError, onLoading, onSuccess} = options || {};
  const [loading, setLoading] = useState<boolean>(false);

  const execute = async (url: string, config?: any) => {
    onLoading?.(true);
    setLoading(true);
    try {
      const res = await axios({
        url,
        baseURL: BASE_URL,
        method: config?.method ?? HTTP.GET,
        ...config,
      });
      onSuccess?.({data: res.data, status: res?.status});
      onLoading?.(false);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      onLoading?.(false);
      onError?.(error.response);
    }
  };
  return {execute, loading};
};

export default useFetchApi;
