const DEFAULT_ERROR_MESSAGE = `An error occurred.`;
const UNAUTHORIZED_ERROR_MESSAGE = `You are not authorized to do this. Please login with an admin account.`;

export default function errorHandler(dispatch, error, type, _id) {
  let errorMessage;
  switch (typeof error) {
    case 'object':
      errorMessage = evalErrObj(error);
      break;
    case 'string':
    case 'number':
      errorMessage = error;
      break;
    default:
      errorMessage = DEFAULT_ERROR_MESSAGE;
  }

  dispatch({
    type,
    _id,
    error: errorMessage
  });
}

function evalErrObj(error) {
  if (!error.status) return DEFAULT_ERROR_MESSAGE;
  if (error.status === 403) return UNAUTHORIZED_ERROR_MESSAGE;
  if (!error.data) return `${error.status}: ${DEFAULT_ERROR_MESSAGE}`;

  if (
    typeof error.data === 'string' ||
    typeof error.data === 'number'
  ) return error.data;

  if (
    error.data.error &&
    (typeof error.data.error === 'string' ||
    typeof error.data.error === 'number')
  ) return error.data.error;

  return `${error.status}: ${DEFAULT_ERROR_MESSAGE}`;
}
