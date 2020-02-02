//Url Base
export const baseUrl = '/';

export const baseUrlApi = 'http://localhost:5001/';

//Url Routes for Components
export const SiteRutas = {
    Home: '/Home',
    Login: '/Login'
};

//Request Header
export const GetHeaderRequest = pToken => {
    return {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${pToken}`
    }
};
export const GetHeaderRequestFormData = pToken => {
    return {
        
        'Authorization': `Bearer ${pToken}`
    }
};
//Response Body
export const GetResponseBody = pResponse => {
  
    const contentType = pResponse.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return pResponse;
    } else {
        console.log(pResponse)
        switch (pResponse.status) {
            case 401:
                return { exitoso: false, mensajeRespuesta: 'No tiene permisos para acceder a este método.', codigoError: 401 };
            case 500:
                return { exitoso: false, mensajeRespuesta: 'Ocurrió un error en el servidor.', codigoError: 500 };
            default:
                return { exitoso: false, mensajeRespuesta: 'Ocurrió un error realizando la acción.', codigoError: 999 };
        }
    }
};