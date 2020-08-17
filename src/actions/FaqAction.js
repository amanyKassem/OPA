import axios from "axios";
import CONST from "../consts";


export const getFaq = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'fqs',
            method      : 'POST',
            data        : { lang },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getFaq', payload: response.data});
        });
    }
};
