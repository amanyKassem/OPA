import axios from "axios";
import CONST from "../consts";


export const getOrdersResults = (lang ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'ordersResults',
            method      : 'POST',
            data        : {lang},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getOrdersResults', payload: response.data});
        });
    }
};
