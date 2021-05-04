import axios from "axios";
import CONST from "../consts";


export const getContractingCategories = (lang , count ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'contractingCategories',
            method      : 'POST',
            data        : {lang , count},
            headers		: token ? { Authorization: token } : null
        }).then(response => {
            dispatch({type: 'getContractingCategories', payload: response.data});
        });
    }
};
