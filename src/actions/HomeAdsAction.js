import axios from "axios";
import CONST from "../consts";


export const getHomeAds = (lang , Latitude , Longitude , keyword , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'homeAds',
            method      : 'POST',
            data        : {lang, Latitude , Longitude , keyword},
            headers		: token ? { Authorization: token } : null
        }).then(response => {
            dispatch({type: 'getHomeAds', payload: response.data});
        });
    }
};

export const setLastLocationAction = (location) => {
    return (dispatch) => {
        dispatch({type: 'last_location', payload: location});

    }
};



