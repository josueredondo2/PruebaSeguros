import { GetHeaderRequest, GetResponseBody, baseUrlApi } from './PathConfig';

export const ActualizarNaucaRequest = async (pToken, pNauca) => {
    const result = await fetch(`${baseUrlApi}api/Nauca/Nauca_Update`, {
        method: 'POST',
        headers: GetHeaderRequest(pToken),
        body: JSON.stringify(pNauca)
    });
    return await GetResponseBody(result);
};

export const EliminarNaucaRequest = async (pToken, pNaucaId) => {
    const result = await fetch(`${baseUrlApi}api/Nauca/Nauca_Delete`, {
        method: 'POST',
        headers: GetHeaderRequest(pToken),
        body: JSON.stringify(pNaucaId)
    });
    return await GetResponseBody(result);
};

export const InsertarPoliza = async (pPoliza) => {
    console.log(pPoliza)
    console.log(JSON.stringify(pPoliza))
    
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



