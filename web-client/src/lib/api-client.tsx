//const API_URL = 'https://divergent-associations-backend-1042962877547.us-west1.run.app';
const API_URL = 'http://localhost:3000/'

interface APIRequestConfig{
    method: 'GET' | 'POST';
    data?: string[];
    title?: string;
    type : boolean;
}

async function apiRequest({ method = 'POST', data , type } : APIRequestConfig){
    const fetchOptions : RequestInit = {
        method,
        headers: {
            'Content-Type' : 'application/json'
        },
        mode : 'cors',
        credentials : 'omit',
    }
    if (data){
        fetchOptions.body = JSON.stringify({data, type});
    }
    console.log(fetchOptions)
    try{
        const response = await fetch(`${API_URL}`, fetchOptions);
        console.log(`${API_URL}`);
        if (!response.ok){
            throw new Error(`API call failed: ${response.statusText}`);
        }
        return response.text();
    } catch(error){
        console.error('API Request failed: ', error);
        throw error;
    }
}

export const sendWords = {
    sendData : (strings : string[]) =>
        apiRequest({
            method : 'POST',
            data : strings,
            type : false,
        }),
    }
export const getDailyWords = {
    getData : () =>
        apiRequest({
            method : 'GET',
            type : false,
        })
    }
export const finalSubmit = {
    sendData : (strings : string[]) =>
        apiRequest({
            method : 'POST',
            data : strings,
            type : true,
        })
}