import { GetHeaderRequest, GetResponseBody } from './PathConfig';

export const GetClientes = async () => {
    const result = await fetch('api/Cliente', {
        method: 'GET',
        headers: GetHeaderRequest()
    });
    return await GetResponseBody(result);
};



