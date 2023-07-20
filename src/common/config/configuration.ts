export interface Config {
  webServer: WebServer;
  mongo: Mongo;
}

export interface WebServer {
  port: number;
}

export interface Mongo {
  url: string;
}

export default (): Config => ({
  webServer: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost/nest',
  },
});
