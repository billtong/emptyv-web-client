import { hashHistory } from 'react-router';

module.exports = {
    checkRedirect: (err) => {
        const errStatus = err.toString().match(/\d/g).join('');
        if (errStatus !== '200') {
            console.log("error handling");
            hashHistory.push('SignIn');
        }
    }
};
