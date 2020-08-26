import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const getAdDetails = (lang , ad_id ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'adDetailes',
            method      : 'POST',
            data        : {lang , ad_id},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getAdDetails', payload: response.data});
        });
    }
};


export const DeleteAd = (lang , id , token , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'deleteAd',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang ,id }
        }).then(response => {

            if (response.data.success){
                navigation.navigate('myAds');
            }

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