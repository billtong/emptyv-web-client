import axios from 'axios';
import { BASE_URL } from './baseURL.jsx';

module.exports = {
    getComemtList: (inputJson) => {
        const deviceListURL = `${BASE_URL}api/comment/load?videoId=${inputJson.videoId}`;

        return axios.get(deviceListURL, {
            headers:{'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json'
            }
        }).then((res) => (res)
            , (err) => {
                throw new Error(err.message);
            });
    }
};

