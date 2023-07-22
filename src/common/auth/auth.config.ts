export interface AuthConfig {
  crypto: CryptoConfig;
  google: GoogleAuthConfig;
}

export interface CryptoConfig {
  jwtSecret: string;
  bcryptRounds: number;
}

export interface GoogleAuthConfig {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  scope: string[];
}

export default (): AuthConfig => ({
  crypto: {
    // TODO: enforce the environment variable in production
    jwtSecret: process.env.JWT_SECRET || 'jwtSecret',
    bcryptRounds: 10,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'clientId',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'clientSecret',
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'callbackUrl',
    scope: ['email', 'profile'],
  },
});
