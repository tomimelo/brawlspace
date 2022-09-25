export interface AppConfig {
  env: string;
  api: {
    port: number;
  };
  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    options: any;
  };
  logger: {
    level: string;
  };
}
