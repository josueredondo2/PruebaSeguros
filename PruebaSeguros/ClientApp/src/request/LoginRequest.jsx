
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
