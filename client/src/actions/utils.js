export default function errorHandler(dispatch, error, type) {
  let errorMessage;

  if (error.status === 403) {
    errorMessage = 'You are not authorized to do this. Please login with an admin account.';
  } else if (error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data){
    errorMessage = error.data;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'An error occurred';
  }

  dispatch({
    type,
    error: errorMessage
  });
}
