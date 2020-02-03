import { GetHeaderRequest, GetResponseBody } from './PathConfig';

export const GetTipoRiesgo = async () => {
    const result = await fetch('api/TipoRiesgo', {
        method: 'GET',
        headers: GetHeaderRequest()
    });
    return await GetResponseBody(result);
};



