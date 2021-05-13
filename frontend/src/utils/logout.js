/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
/* eslint-disable  no-plusplus */
/* eslint-disable no-restricted-globals */

import axios from "axios";
import constants from '../constants/constants';

const logout = async () => {
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    await axios
        .post(`${constants.baseUrl}/users/logout`)
        .then(() => {
            localStorage.clear();
            window.location.replace("/");
        })
        .catch((err) => {
            alert(err);
        });
};
export default logout;
