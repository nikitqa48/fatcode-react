import {BASE_URL} from "../../../../api";

const jwtServiceConfig = {
  signIn: `${BASE_URL}/auth/token/login/`,
  // signUp: 'api/auth/sign-up',
  accessToken: `${BASE_URL}/auth/users/me/`,
  updateUser: `${BASE_URL}/auth/users/me/`,
};

export default jwtServiceConfig;
