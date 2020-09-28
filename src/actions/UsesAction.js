import axios from "axios";
import CONST from "../consts";


export const getUses= (lang) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'uses',
            method      : 'POST',
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getUses', payload: response.data});
        });
    }
};
