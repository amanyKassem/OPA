import axios from "axios";
import CONST from "../consts";


export const getCountries = (lang) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'countries',
            method      : 'POST',
            data        : {lang},
            // headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getCountries', payload: response.data});
        });
    }
};
