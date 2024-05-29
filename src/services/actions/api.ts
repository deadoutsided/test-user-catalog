const BASE_URL = "https://reqres.in/api";

type THeaders = {
  "Content-Type": "application/json";
  authhorization?: string;
}

type TOptions = {
  method: string;
  headers: THeaders;
  body: string;
}

const checkResponse = (res: Response) => {
  if(res.ok){
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export async function request(endpoint: string, options?: TOptions) {
  return await fetch(`${BASE_URL + endpoint}`, options).then(checkResponse)
}