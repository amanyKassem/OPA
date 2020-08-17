import axios from "axios";
import CONST from "../consts";


export const getCategories = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'categories',
            method      : 'POST',
            data        : {lang},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getCategories', payload: response.data});
        });
    }
};
