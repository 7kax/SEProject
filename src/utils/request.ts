import axios from 'axios';

export const postRequest = async (url: string, data: any) => {
    return axios.post(url, data, {
        headers: {
            'Content-Type': "application/json"
        },
        timeout: 5000
    });
};

export const postRequestWithToken = async (url: string, data: any, token: string) => {
    return axios.post(url, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json"
        },
        timeout: 5000
    })
};