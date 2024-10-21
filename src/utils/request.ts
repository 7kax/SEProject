import axios from 'axios';

export const post = async (url: string, data: any) => {
    return axios.post(url, data, {
        headers: {
            'Content-Type': "application/json"
        },
        timeout: 5000
    });
};

export const postWithToken = async (url: string, data: any, token: string) => {
    return axios.post(url, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json"
        },
        timeout: 5000
    })
};

export const patchWithToken = async (url: string, data: any, token: string) => {
    return axios.patch(url, data, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
};

export const getWithToken = async (url: string, token: string) => {
    return axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

export const deleteWithToken = async (url: string, token: string) => {
    return axios.delete(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}