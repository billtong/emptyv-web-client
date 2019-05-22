import axios from 'axios';
import { BASE_URL } from './baseURL';
import { getTokenParamURL } from './apiHelper';

export const postNewFile = (files, newFilepaths) => {
  const getFavListURL = `${BASE_URL}api/file/upload?${getTokenParamURL()}&filepaths=${newFilepaths}`;
  return axios.post(getFavListURL, files)
  .then((res) => (res) 
  , (err) => {
    throw new Error(err.message);
  });
};
