import {BASE_URL} from "../../../../api";

const jwtServiceConfig = {
  signIn: `${BASE_URL}/auth/token/login/`,
  signUp: `${BASE_URL}/auth/users/`,
  accessToken: `${BASE_URL}/auth/users/me/`,
  updateUser: `${BASE_URL}/auth/users/me/`,
};

export default jwtServiceConfig;
