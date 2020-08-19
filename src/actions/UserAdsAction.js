import axios from "axios";
import CONST from "../consts";


export const getUserAds = (lang , user_id ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'userAds',
            method      : 'POST',
            data        : {lang , user_id},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getUserAds', payload: response.data});
        });
    }
};
