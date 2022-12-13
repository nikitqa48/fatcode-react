import {BASE_URL} from "../../../../api";

const jwtServiceConfig = {
  signIn: `${BASE_URL}/auth/token/login/`,
  // signUp: 'api/auth/sign-up',
  accessToken: `${BASE_URL}/auth/token/login/`,
  // updateUser: 'api/auth/user/update',
};

export default jwtServiceConfig;
