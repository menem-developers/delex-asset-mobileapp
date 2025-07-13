import axios from 'axios';
import {BASE_URL} from 'utlis/endpoints';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';
import {reset} from 'routes/utils';

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

    const requestConfig = {
      url,
      baseURL: BASE_URL,
      method: config?.method ?? HTTP.GET,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        ...(config?.headers || {}),
      },
      ...config,
    };

    // 🔍 LOG THE EXACT HEADERS BEING SENT
    console.log(
      '📡 HEADERS BEING SENT:',
      JSON.stringify(requestConfig.headers, null, 2),
      BASE_URL + url,
    );
    console.log(
      '📡 FULL REQUEST CONFIG:',
      JSON.stringify(requestConfig, null, 2),
      BASE_URL + url,
    );

    onLoading?.(true);
    setLoading(true);

    try {
      const res = await axios(requestConfig);
      console.log('✅ RESPONSE STATUS:', res.status);
      console.log('✅ RESPONSE HEADERS:', res.headers);

      onSuccess?.({data: res.data, status: res?.status, url});
      onLoading?.(false);
      setLoading(false);
    } catch (error: any) {
      console.log('❌ ERROR STATUS:', error.response?.status);
      console.log('❌ ERROR RESPONSE:', error.response?.data);
      console.log('❌ ERROR HEADERS:', error.response?.headers);

      setLoading(false);
      if (
        error.response?.status === 401 &&
        error.response?.data.error === 'Token has expired. Please login again.'
      ) {
        ToastAndroid.show(error.response?.data.error, ToastAndroid.SHORT);
        AsyncStorage.removeItem('key');
        reset([{name: 'Login'}]);
      }
      onLoading?.(false);
      onError?.(error.response);
    }
  };
  return {execute, loading};
};

export default useFetchApi;
