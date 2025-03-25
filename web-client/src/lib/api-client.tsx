const API_URL = 'https://divergent-associations-backend-1042962877547.us-west1.run.app';

interface APIRequestConfig{
    method: 'GET' | 'POST';
    data?: string[];
    title?: string;
    type : boolean;
}

interface APIResponse {
    success: boolean;
    data?: any;
    error?: {
        code: number;
        message: string;
    };
}

async function apiRequest({ method = 'POST', data, type } : APIRequestConfig): Promise<APIResponse> {
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
        
        // Create a response object
        const apiResponse: APIResponse = {
            success: response.ok
        };
        
        if (!response.ok){
            // Handle error responses
            apiResponse.error = {
                code: response.status,
                message: response.statusText || 'Unknown error occurred'
            };
            
            // For 400 errors specifically related to spelling
            if (response.status === 400) {
                apiResponse.error.message = 'One or more words may be misspelled';
            }
            
            return apiResponse;
        }
        
        // Handle successful responses
        const responseText = await response.text();
        try {
            apiResponse.data = JSON.parse(responseText);
        } catch {
            apiResponse.data = responseText;
        }
        
        return apiResponse;
    } catch(error) {
        console.error('API Request failed: ', error);
        return {
            success: false,
            error: {
                code: 0, // Use 0 for network/connection errors
                message: error instanceof Error ? error.message : 'Network error occurred'
            }
        };
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