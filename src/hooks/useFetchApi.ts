import axios from 'axios';
import {BASE_URL} from 'utlis/endpoints';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const token = await AsyncStorage.getItem('key');
    onLoading?.(true);
    setLoading(true);
    console.log('url:- ', BASE_URL + url);
    console.log('config:- ', JSON.stringify(config));
    try {
      const res = await axios({
        url,
        baseURL: BASE_URL,
        method: config?.method ?? HTTP.GET,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          ...(config?.headers || {}),
        },
        ...config,
      });
      onSuccess?.({data: res.data, status: res?.status, url});
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
