import { GetHeaderRequest, GetResponseBody } from './PathConfig';

export const GetPolizasXClientes = async (Cedula) => {
    console.log('entre')
    const result = await fetch('api/PolizaXCliente/' + Cedula, {
        method: 'GET',
        headers: GetHeaderRequest()
    });
    return await GetResponseBody(result);
};



