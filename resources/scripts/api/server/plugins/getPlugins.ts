import http from '@/api/http';

export interface Plugin {
    id: number;
    tag: string;
    name: string;
    premium?: boolean | undefined;
}

export const rawDataToPlugin = (data: any): Plugin => ({
    id: data.id,
    tag: data.tag,
    name: data.name,
    premium: data.premium,
});

export default async (uuid: string, query: string): Promise<Plugin[]> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/client/servers/${uuid}/plugins`, { query })
            .then(({ data }) => resolve((data.data || []).map((d: any) => rawDataToPlugin(d.attributes))))
            .catch(reject);
    });
};
