//Url Base

export const baseUrl = "/";

export const baseUrlApi = "http://localhost:5001/";

//Url Routes for Components
export const SiteRutas = {
  Home: "/Home",
  Login: "/Login",
  Poliza: "/Poliza",
  PolizaEditor: "/PolizaEditor"
};

//Request Header
export const GetHeaderRequest = () => {
  const token = sessionStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
};
export const GetHeaderRequestFormData = () => {
  const token = sessionStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`
  };
};
//Response Body
export const GetResponseBody = pResponse => {
  const contentType = pResponse.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return pResponse;
  } else {
    return pResponse;
  }
};
