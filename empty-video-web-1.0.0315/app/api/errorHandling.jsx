import { hashHistory } from 'react-router';

export const checkRedirect = (err) => {
  const errStatus = err.toString().match(/\d/g).join('');
  if (errStatus !== '200') {
    console.log('error handling');
    hashHistory.push('SignIn');
  }
};

