import axios from "axios";
import CONST from "../consts";


export const getCategoryConstructions = (lang , category_id , type ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'categoryConstructions',
            method      : 'POST',
            data        : {lang , category_id , type},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getCategoryConstructions', payload: response.data});
        });
    }
};
