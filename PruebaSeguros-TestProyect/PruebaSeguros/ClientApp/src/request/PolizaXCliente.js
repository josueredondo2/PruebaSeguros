import { GetHeaderRequest, GetResponseBody } from './PathConfig';


export const EliminarPolizaXCliente = async (Objeto) => {
    const result = await fetch(`api/PolizaXCliente/DeletePost`, {
        method: 'POST',
        headers: GetHeaderRequest(),
        body: JSON.stringify(Objeto)
    });
    return await GetResponseBody(result);
};

export const InsertarPolizaXCliente = async (pPolizaXCliente) => {
    console.log(1,pPolizaXCliente)
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



