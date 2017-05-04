import axios from 'axios';
import cookie from 'react-cookie';

const url = (function () {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'http://campfire-stories.zqn45wimsv.us-east-1.elasticbeanstalk.com'
    default:
      return 'http://localhost:3001'
  }
})();

const instance = axios.create({
  baseURL: url,
  timeout: 3000
});

export const setInstance = () => {
  const token = cookie.load('token')
  const user = cookie.load('user')

  if (!token || !user) return void 0;
  instance.defaults.headers = {
    authorization: token,
    user: user._id
  };
};

export const updateAxios = (token, user) => {
  cookie.save('token', token, { path: '/' });
  cookie.save('user', user, { path: '/'});
  setInstance();
};

setInstance();

export default instance;
