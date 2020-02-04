import { GetHeaderRequest, GetResponseBody } from './PathConfig';

export const EliminarPoliza = async (id) => {
    const result = await fetch(`api/PolizaEncabezado/`+ id, {
        method: 'DELETE',
        headers: GetHeaderRequest()
    });
    return await GetResponseBody(result);
};

export const ActualizarPoliza = async (pPoliza) => {
    const result = await fetch(`api/PolizaEncabezado/`, {
        method: 'PUT',
        headers: GetHeaderRequest(),
        body: JSON.stringify(pPoliza)
    });
    return await GetResponseBody(result);
};

export const InsertarPoliza = async (pPoliza) => {
    const result = await fetch(`api/PolizaEncabezado/`, {
        method: 'POST',
        headers: GetHeaderRequest(),
        body: JSON.stringify(pPoliza)
    });
    return await GetResponseBody(result);
};

export const GetPolizas = async () => {
    const result = await fetch('api/PolizaEncabezado', {
        method: 'GET',
        headers: GetHeaderRequest()
    });
    return await GetResponseBody(result);
};



