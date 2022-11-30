import { Url } from 'url';
import http, { FractalResponseData } from '@/api/http';

export interface GeneralSettings {
    panelName: string;
    panelTheme: string;
    panelLogo: Url;
    panelBackground: Url;
}

const rawDataToGeneralSettings = ({ attributes: data }: FractalResponseData): GeneralSettings => ({
    panelName: data.panel_name,
    panelTheme: data.panel_theme,
    panelLogo: data.panel_logo,
    panelBackground: data.panel_background,
});

export const getGeneralSettings = async (): Promise<GeneralSettings> => {
    return new Promise((resolve, reject) => {
        http.get('/api/application/settings')
            .then(({ data }) => resolve(rawDataToGeneralSettings(data)))
            .catch(reject);
    });
};
