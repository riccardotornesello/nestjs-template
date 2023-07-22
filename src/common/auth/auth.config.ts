export interface AuthConfig {
  jwtSecret: string;
  bcryptRounds: number;
}

export default (): AuthConfig => ({
  // TODO: enforce the environment variable in production
  jwtSecret: process.env.JWT_SECRET || 'jwtSecret',
  bcryptRounds: 10,
});
