import { useState, useCallback } from 'react';
import axios from 'axios';


const useHttp = () => {
  const [hasError, setHasError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverData, setServerData] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  const sendRequest = useCallback(async (config) => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: config.url,
        method: config.method ? config.method : 'GET',
        headers: config.headers ? config.headers : {},
        data: config.body ? config.body : null,
      });

      if (response.statusText !== 'OK') {
        throw new Error('Request failed!');
      }

      setServerData(response.data);
      setStatusCode(response.status);

      setIsLoading(false);
      setHasError('');
    } catch (error) {
      setHasError(error.message || 'Something went wrong...');
      setIsLoading(false);
    }
  }, []);

  return {
    hasError,
    isLoading,
    serverData,
    sendRequest,
    statusCode,
  };
};

export default useHttp;
