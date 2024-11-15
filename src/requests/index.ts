import axios from 'axios';

export const Authorization = (token: string): Headers => {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    return headers;
};
export const JsonContentType = (): Headers => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
};
export const JsonTypeWithToken = (token: string): Headers => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);
    return headers;
};
export const MultiPartTypeWithToken = (token: string): Headers => {
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', `Bearer ${token}`);
    return headers;
};

export const baseRequest = async (url: string, method: string, data: any, headers: any) => {
    try {
        const res = await axios({
            method,
            url,
            data,
            headers,
            timeout: 5000
        });
        return res.data;
    } catch (err) {
        throw err;
    }
}