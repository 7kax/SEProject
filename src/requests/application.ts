import { baseRequest, Authorization } from '@/requests';
import { useAuthStore } from '@/stores/auth';

export const addClaim = async (params: {
    doi: string;
}) => {
    const doi = Buffer.from(params.doi).toString('base64');
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/papers/request/claim?doi=${doi}`,
        'POST',
        null,
        Authorization(token)
    );
};

export const removeClaim = async (params: ClaimInfo) => {
    const doi = Buffer.from(params.doi).toString('base64');
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/papers/request/claim?doi=${doi}&id=${params.id}`,
        'DELETE',
        null,
        Authorization(token)
    );
};

export const fetchClaim = async () => {
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/papers/request/claim`,
        'GET',
        null,
        Authorization(token)
    );
};

export const addDelete = async (params: {
    doi: string;
}) => {
    const doi = Buffer.from(params.doi).toString('base64');
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/papers/request/delete?doi=${doi}`,
        'POST',
        null,
        Authorization(token)
    );
};

export const removeDelete = async (params: DeleteInfo) => {
    const doi = Buffer.from(params.doi).toString('base64');
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/papers/request/delete?doi=${doi}&id=${params.id}`,
        'DELETE',
        null,
        Authorization(token)
    );
};

export const fetchDelete = async () => {
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/papers/request/delete`,
        'GET',
        null,
        Authorization(token)
    );
};