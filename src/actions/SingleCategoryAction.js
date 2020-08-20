import axios from "axios";
import CONST from "../consts";


export const getSingleCategory = (lang , id ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'singleCategory',
            method      : 'POST',
            data        : { lang , id },
            headers     : { Authorization: token },
        }).then(response => {
            dispatch({type: 'getSingleCategory', payload: response.data});
        });
    }
};
