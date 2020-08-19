import axios from "axios";
import CONST from "../consts";


export const getFeatures = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'features',
            method      : 'POST',
            data        : {lang},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getFeatures', payload: response.data});
        });
    }
};
