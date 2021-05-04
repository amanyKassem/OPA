import axios from "axios";
import CONST from "../consts";


export const getAbout = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'about',
            method      : 'POST',
            data        : { lang },
            headers		: token ? { Authorization: token } : null
        }).then(response => {
            dispatch({type: 'getAbout', payload: response.data});
        });
    }
};
