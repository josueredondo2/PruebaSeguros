import { GetHeaderRequest, GetResponseBody } from './PathConfig';


export const EliminarPolizaXCliente = async (Cedula,IdPoliza) => {
    const result = await fetch(`api/PolizaXCliente/`+ Cedula, {
        method: 'DELETE',
        headers: GetHeaderRequest()
    });
    return await GetResponseBody(result);
};

export const InsertarPolizaXCliente = async (pPolizaXCliente) => {
    const result = await fetch(`api/PolizaXCliente/`, {
        method: 'POST',
        headers: GetHeaderRequest(),
        body: JSON.stringify(pPolizaXCliente)
    });
    return await GetResponseBody(result);
};

export const GetPolizasXClientes = async (Cedula) => {
    console.log('entre')
    const result = await fetch('api/PolizaXCliente/' + Cedula, {
        method: 'GET',
        headers: GetHeaderRequest()
    });
    return await GetResponseBody(result);
};



