import { Authorization, baseRequest, JsonTypeWithToken, MultiPartTypeWithToken } from "@/requests";
import { useAuthStore } from "@/stores/auth";

export const addPaper = async (data: Paper) => {
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/papers`,
        'POST',
        data,
        JsonTypeWithToken(token)
    );
};

export const removePaper = async (params: {
    doi: string;
}) => {
    const doi = Buffer.from(params.doi).toString('base64');
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/papers/${doi}`,
        'DELETE',
        null,
        Authorization(token)
    );
};

export const updatePaper = async (data: Paper) => {
    const doi = Buffer.from(data.DOI).toString('base64');
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/papers/${doi}`,
        'PATCH',
        data,
        JsonTypeWithToken(token)
    );
};

export const uploadPaperFile = async (data: {
    file: File;
}, params: {
    doi: string;
}) => {
    const doi = Buffer.from(params.doi).toString('base64');
    const formData = new FormData();
    formData.append('file', data.file);
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/papers/${doi}/file`,
        'POST',
        formData,
        MultiPartTypeWithToken(token)
    );
};

export const fetchPaper = async (params: {
    id: string;
    doi: string;
}) => {
    const doi = Buffer.from(params.doi).toString('base64');
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/papers?doi=${doi}&id=${params.id}`,
        'GET',
        null,
        Authorization(token)
    );
};

export const addPaperAuthor = async (params: ClaimInfo) => {
    const doi = Buffer.from(params.doi).toString('base64');
    // const token = localStorage.getItem('token')!;
    const token = useAuthStore().user!.token;
    return baseRequest(`/api/papers/author?doi=${doi}&id=${params.id}`,
        'POST',
        null,
        Authorization(token)
    );
};