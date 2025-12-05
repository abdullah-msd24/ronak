import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'RONAK',
  version: process.env.APP_VERSION || '1.0.0',
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  environment: process.env.APP_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  googleClientId: process.env.GOOGLE_CLIENT_ID || 'your_google_client_id',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your_google_client_secret',
  facebookAppId: process.env.FACEBOOK_APP_ID || 'your_facebook_app_id',
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET || 'your_facebook_app_secret',
}));