export interface AppConfig {
  mongo: MongoConfig;
}

export interface MongoConfig {
  url: string;
}

export default (): AppConfig => ({
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/nest',
  },
});
