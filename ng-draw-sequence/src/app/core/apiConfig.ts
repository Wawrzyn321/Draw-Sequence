import { InjectionToken } from '@angular/core';

export interface ApiConfig {
    mainUrl: string;
    auth: string;
    image: string;
}

export const API_CONFIG = new InjectionToken<ApiConfig>('apiConfig');
