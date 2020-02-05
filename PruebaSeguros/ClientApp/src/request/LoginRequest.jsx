import { GetHeaderRequest, GetResponseBody } from './PathConfig';

export const LoginRequest = async (pUserName, pPassword) => {
    const data = { Usuario: pUserName, Pass: pPassword };
    const result = await fetch('api/Login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await result;
};


export const VerificaTokenValido = async () => {
    const result = await fetch(`api/Login/VerificaTokenValido`, {
        method: 'POST',
        headers: GetHeaderRequest(),
    });
    return await GetResponseBody(result);
};