import axios from "axios";
import CONST from "../consts";


export const getAuthUserAds = (lang ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'authUserAds',
            method      : 'POST',
            data        : {lang},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getAuthUserAds', payload: response.data});
        });
    }
};
