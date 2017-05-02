import urlRegex from 'url-regex';
import axios from '../utils/axios'

const emailPattern = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(io|xyz|fr|cn|ca|us|dz||aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&-])[A-Za-z\d$@$!%*#?&-]{8,}$/

const validateEmail = email => !email
  ? 'Email is required'
  : !emailPattern.test(email)
    && 'Email is invalid';

const validateName = (name, type) => (!name || name.length < 2)
  && `${type} name is required and must be at least 1 letter`;

const validatePassword = password => !passwordPattern.test(password)
  && 'Password must be at least 8 characters, contain an uppercase, number and symbol';

const validatePasswordMatch = (password, passwordConfirmation) =>
  password !== passwordConfirmation && 'Passwords must match'

const validateTitle = title => !title
  ? 'The title is required. Please provide a title for the story.'
  : title.length < 5
  && 'The title should be at least 5 letters long.';

const validateImage = image => !image
  ? 'You need to provide a url to where your image is stored'
  : !urlRegex({ exact: true }).test(image)
  && 'This needs to be a url (ex: http://findhere.com/image)'

const validateBody = body => (!body || body.length < 100)
  && 'The story text is too short!'

export const validateRegister = data => ({
  email: validateEmail(data.email),
  firstName: validateName(data.firstName, 'First'),
  lastName: validateName(data.lastName, 'Last'),
  password: validatePassword(data.password),
  passwordConfirmation: validatePasswordMatch(
    data.password,
    data.passwordConfirmation
  )
});

export const validateChangePassword = data => ({
  oldPassword: validatePassword(data.oldPassword),
  newPassword: validatePassword(data.newPassword),
  passwordConfirmation: validatePasswordMatch(
    data.newPassword,
    data.passwordConfirmation
  )
});

export const validateLogin = data => ({
  email: validateEmail(data.email),
  password: validatePassword(data.password)
});

export const validatePost = data => ({
  title: validateTitle(data.title),
  image: validateImage(data.image),
  body: validateBody(data.body)
});

export const imgUrlHeaderValidate = values =>
  axios.get(`/api/content/checkImage?url=${values.image}`)
    .then(check => !check.data.checkResult && { image: 'This url doesn\'t point to an image' })
    .catch(console.error);
