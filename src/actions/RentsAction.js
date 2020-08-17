import axios from "axios";
import CONST from "../consts";


export const getRents = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'rents',
            method      : 'POST',
            data        : {lang},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getRents', payload: response.data});
        });
    }
};
