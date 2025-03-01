const API_URL = 'http://localhost:5000/api';

interface APIRequestConfig{
    endpoint : string;
    method?: 'GET' | 'POST';
    data?: any;
}

async function apiRequest({ endpoint, method = 'GET', data } : APIRequestConfig){
    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers : {
            'Content-Type' : 'application/json',
        },
        ...(data && { body : JSON.stringify(data)}),
    });

    if(!response.ok){
        throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.text();
}

export const baseAPICall = {
    sendTestData : (strings : string[]) =>
        apiRequest({
            endpoint : '/test',
            method : 'POST',
            data : strings,
        }),
};