import axios from "axios";
import CONST from "../consts";


export const getUserData = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'UserData',
            method      : 'POST',
            data        : {lang},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getUserData', payload: response.data});
        });
    }
};
