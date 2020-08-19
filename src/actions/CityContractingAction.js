import axios from "axios";
import CONST from "../consts";


export const getCityContracting = (lang , count ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'cityContractingCategories',
            method      : 'POST',
            data        : {lang , count},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getCityContracting', payload: response.data});
        });
    }
};
