import axios from "axios";
import CONST from "../consts";


export const getCategoryConstructions = (lang ,latitude , longitude , category_id , type ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'categoryConstructions',
            method      : 'POST',
            data        : {lang ,latitude , longitude , category_id , type},
            headers		: token ? { Authorization: token } : null
        }).then(response => {
            dispatch({type: 'getCategoryConstructions', payload: response.data});
        });
    }
};
