import axios from "axios";
import CONST from "../consts";


export const getAdFees = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'adFees',
            method      : 'POST',
            data        : { lang },
            headers		: token ? { Authorization: token } : null
        }).then(response => {
            dispatch({type: 'getAdFees', payload: response.data});
        });
    }
};
