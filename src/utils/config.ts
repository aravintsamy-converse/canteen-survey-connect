import config from '../../public/config.json';

interface AppConfig {
  API_URL: string;
  ENV: string;
  SENTRY_DSN?: string;
}

let _config: AppConfig | null = null;

export async function getRuntimeConfig(): Promise<AppConfig> {
  if (_config) return _config;
  
  try {
    const response = config;
    return response;
  } catch (error) {
    console.error('Failed to load runtime config:', error);
    return {
      API_URL: '',
      ENV: 'development'
    };
  }
}