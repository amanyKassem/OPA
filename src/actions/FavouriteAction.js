import axios from "axios";
import CONST from "../consts";


export const getFavourite = (lang ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'faveorites',
            method      : 'POST',
            data        : {lang},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getFavourite', payload: response.data});
        });
    }
};
