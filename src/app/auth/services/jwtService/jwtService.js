import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import jwtServiceConfig from './jwtServiceConfig';

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {

  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid token');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signUp, data)
        .then((response) => {
          if (response.data) {
            // this.setSession(response.data.auth_token);
            // resolve(response.data);
            // this.emit('registration', 'Теперь можете войти!');
            this.setSession(null);
            // response.data.role = [];
            this.emit('registration', 'Теперь можете войти!');
          }
        })
        .catch((_errors) => {
          const errors = [
            {type: 'username', message: _errors.response.data.username},
            {type: 'email', message: ''},
            {type: 'password', message: _errors.response.data.password},
            {type: 'invite', message: _errors.response.data.detail},
          ];
          reject(errors);
        });
    });
  };

  // signInWithEmailAndPassword = (email, password) => {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get(jwtServiceConfig.signIn, {
  //         data: {
  //           email,
  //           password,
  //         },
  //       })
  //       .then((response) => {
  //         if (response.data.user) {
  //           this.setSession(response.data.access_token);
  //           resolve(response.data.user);
  //           this.emit('onLogin', response.data.user);
  //         } else {
  //           reject(response.data.error);
  //         }
  //       });
  //   });
  // };

  signInWithLoginAndPassword = (username, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signIn, {
          password,
          username,
        })
        .then((response) => {
          if (response.data) {
            this.setSession(response.data.auth_token);
            this.getUser().then((user) => {
              // TODO разобраться с ролями
              user.role = 'admin';
              resolve(user);
              this.emit('onLogin', user);
            });
          } else {
            reject(response.data);
          }
        })
        .catch((_errors) => {
          const errors = [
            {type: 'password', message: _errors.response.data.non_field_errors},
            {type: 'login', message: ''},
          ];
          reject(errors);
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(jwtServiceConfig.accessToken)
        .then((response) => {
          if (response.data.id) {
            this.setSession(this.getAccessToken());
            // TODO разобраться с ролями
            response.data.role = 'admin';
            resolve(response.data);
          } else {
            this.logout();
            reject(new Error('Failed to login with token.'));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Failed to login with token.'));
        });
    });
  };

  getUser = () => {
    // return new Promise((resolve, reject) => {
    return axios.get(jwtServiceConfig.accessToken).then((response) => response.data);
    // });
  };

  updateUserData = (user) => {
    return axios.get(jwtServiceConfig.updateUser);
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Token ${access_token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Вы вышли!');
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    axios
      .get(jwtServiceConfig.updateUser, {
        headers: {
          Authorization: `Token ${access_token}`,
        },
      })
      .then((response) => {
        if (response.data) {
          return true;
          // this.setSession(response.data.auth_token);
          // resolve(response.data.user);
          // this.emit('onLogin', response.data.user);
        }
      })
      .catch((_errors) => {
        console.log('E', _errors.data);
        return false;
      });
    // const decoded = jwtDecode(access_token);
    // const currentTime = Date.now() / 1000;
    // if (decoded.exp < currentTime) {
    //   console.warn('access token expired');
    //   return false;
    // }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };
}

const instance = new JwtService();

export default instance;
