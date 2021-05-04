import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const getContactUs = (lang,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'contact',
            method      : 'POST',
            headers		: token ? { Authorization: token } : null,
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getContactUs', payload: response.data});
        });
    }
};

export const sendComplaint = (lang , complaint , name , email , token ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'sendComplaint',
            method      : 'POST',
            headers		: token ? { Authorization: token } : null,
            data        : {lang ,complaint , name , email }
        }).then(response => {
            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center'
                }
            });
        });

    }
};