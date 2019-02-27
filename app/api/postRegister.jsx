import axios from 'axios';
import { BASE_URL } from './baseURL.jsx';

module.exports = {
    postRegister: (inputJson) => {
        const deviceListURL = `${BASE_URL}api/user/signUp`;
        return axios.post(deviceListURL, {
            userName: inputJson.userName,
            userPassword: inputJson.userPassword,
            userEmail: inputJson.userEmail
        }, {
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res) => (res)
            , (err) => {
                throw new Error(err.message);
            });
    }
};
