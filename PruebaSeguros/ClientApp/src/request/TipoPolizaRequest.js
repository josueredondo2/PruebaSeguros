import { GetHeaderRequest, GetResponseBody } from './PathConfig';

export const GetTipoPolizas = async () => {
    const result = await fetch('api/TipoPoliza', {
        method: 'GET',
        headers: GetHeaderRequest()
    });
    return await GetResponseBody(result);
};



