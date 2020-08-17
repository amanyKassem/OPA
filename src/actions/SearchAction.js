import axios from "axios";
import CONST from "../consts";


export const getSearch = (lang , keyword , Latitude , Longitude , category_id , rent_id , min_space , max_space , min_price , max_price ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'filterAds',
            method      : 'POST',
            data        : {lang , keyword , Latitude , Longitude , category_id , rent_id , min_space , max_space , min_price , max_price},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getSearch', payload: response.data});
        });
    }
};
