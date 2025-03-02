const jIP = 'http://172.30.176.1:5000'
const lh = 'http://localhost:5000'
const API_URL = jIP;

interface APIRequestConfig{
    method: 'GET' | 'POST';
    data?: string[];
}

async function apiRequest({ method = 'POST', data } : APIRequestConfig){
    const fetchOptions : RequestInit = {
        method,
        headers: {
            'Content-Type' : 'application/json'
        },
        mode : 'cors',
        credentials : 'omit',
    }
    if (data){
        fetchOptions.body = JSON.stringify(data);
    }
    console.log(fetchOptions)
    try{
        const response = await fetch(`${API_URL}`, fetchOptions);

        if (!response.ok){
            throw new Error(`API call failed: ${response.statusText}`);
        }
        return response.text();
    } catch(error){
        console.error('API Request failed: ', error);
        throw error;
    }
}

export const baseAPICall = {
    sendTestData : (strings : string[]) =>
        apiRequest({
            method : 'POST',
            data : strings,
        }),
    }