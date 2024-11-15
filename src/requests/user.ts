import { Authorization, baseRequest, JsonContentType, JsonTypeWithToken } from '@/requests';
import { useAuthStore } from '@/stores/auth';

export const userLogin = async (data: {
    id: string;
    password: string;
}) => {
    return baseRequest(`/api/login`,
        'POST',
        data,
        JsonContentType()
    );
};

export const adminLogin = async (data: {
    id: string;
    password: string;
}) => {
    return baseRequest(`/api/admin/login`,
        'POST',
        data,
        JsonContentType()
    );
};

export const addUser = async (data: {
    id: string;
    password: string;
}) => {
    return baseRequest(`/api/users`,
        'POST',
        data,
        JsonContentType()
    );
};

export const fetchUser = async (params: {
    id: string;
}) => {
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/users/${params.id}`,
        'GET',
        null,
        Authorization(token)
    );
};

export const updateUser = async (data: UserInfo) => {
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/users/${data.id}`,
        'PATCH',
        data,
        JsonTypeWithToken(token)
    );
};

export const removeUser = async (params: {
    id: string;
}) => {
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/users/${params.id}`,
        'DELETE',
        null,
        Authorization(token)
    );
};

export const updatePassword = async (data: {
    oldPassword: string;
    newPassword: string;
}, params: {
    id: string;
}) => {
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/users/${params.id}/password`,
        'PATCH',
        data,
        JsonTypeWithToken(token)
    );
};

export const fetchUsers = async () => {
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/users`,
        'GET',
        null,
        Authorization(token)
    );
};