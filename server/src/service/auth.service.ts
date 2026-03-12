
import {generateToken} from '../utils/jwt';

export const handleGoogleLogin = (user: any) => {
  const token = generateToken(user);

  return token;
};


