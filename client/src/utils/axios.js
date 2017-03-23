import axios from 'axios'
import cookie from 'react-cookie'

const url = (function () {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'http://campfire-stories.zqn45wimsv.us-east-1.elasticbeanstalk.com'
    default:
      return 'http://localhost:3001'
  }
})()

export const setInstance = () => {
  const token = cookie.load('token');
  axios.defaults.headers.common['authorization'] = token;
}

setInstance()

const instance = axios.create({
  baseURL: url
})

export default instance
