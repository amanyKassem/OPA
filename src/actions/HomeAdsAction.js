import axios from "axios";
import CONST from "../consts";


export const getHomeAds = (lang , Latitude , Longitude , keyword , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'homeAds',
            method      : 'POST',
            data        : {lang, Latitude , Longitude , keyword},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getHomeAds', payload: response.data});
        });
    }
};
