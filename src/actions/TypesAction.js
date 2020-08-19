import axios from "axios";
import CONST from "../consts";


export const getTypes = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'types',
            method      : 'POST',
            data        : {lang},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getTypes', payload: response.data});
        });
    }
};
