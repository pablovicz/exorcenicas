import axios, { AxiosResponse } from 'axios';

export interface FileUploadResponse {
    filename: string;
    mimetype: string;
    size: number;
    width: number;
    height: number;
    url: string;
    id: string;
}


const uploadApi = axios.create({
    baseURL: import.meta.env.VITE_API_GRAPH_CMS_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_GRAPH_CMS_ACCESS_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

interface UploadControllerContent {
    uploadAsset: (file: any) => Promise<AxiosResponse<FileUploadResponse>>;
}

export function UploadController(): UploadControllerContent {


    async function uploadAsset(file: any): Promise<AxiosResponse> {

        const data = new FormData();
        data.append('fileUpload', file);


        return await uploadApi.post('/upload', data)
    }

    return { uploadAsset }
}
