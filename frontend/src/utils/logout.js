/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
/* eslint-disable  no-plusplus */
/* eslint-disable no-restricted-globals */

import axios from "axios";
import constants from '../constants/constants';

const deleteCookies = () => {
    const cookies = document.cookie.split("; ");
    for (let c = 0; c < cookies.length; c++) {
        const d = window.location.hostname.split(".");
        while (d.length > 0) {
            const cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            const p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
};

const logout = async () => {
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    await axios
        .post(`${constants.baseUrl}/users/logout`)
        .then(() => {
            localStorage.clear();
            deleteCookies();
            window.location.replace("/");
        })
        .catch((err) => {
            alert(err);
        });
};
export default logout;
