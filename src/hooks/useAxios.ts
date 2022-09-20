// import { useState, useCallback } from 'react';
// import axios from '../api/axios.config';
// import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

// interface IUseAxios {
//     isLoading: boolean;
//     error: AxiosError<unknown, any> | undefined;
//     sendRequest: (
//         config: AxiosRequestConfig
//     ) => Promise<AxiosResponse<any, any> | undefined>;
//     handleClearError: () => void;
// }

// export const useAxios = (): IUseAxios => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<AxiosError<unknown, any>>();

//     const sendRequest = useCallback(
//         async (
//             config: AxiosRequestConfig
//         ): Promise<AxiosResponse<any, any> | undefined> => {
//             try {
//                 setIsLoading(true);

//                 const response = await axios.request(config);
//                 setIsLoading(false);
//                 return response;
//             } catch (error) {
//                 setIsLoading(false);
//                 const err = error as AxiosError;
//                 setError(err);
//                 console.log('err', err);
//             }
//         },
//         []
//     );

//     const handleClearError = useCallback(() => setError(undefined), []);

//     return {
//         isLoading,
//         error,
//         sendRequest,
//         handleClearError
//     };
// };
export {};
