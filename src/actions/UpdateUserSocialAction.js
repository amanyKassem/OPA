import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const updateUserSocial = (lang , facebook , twitter , contact_phone , contact_email , detailes , token , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'UpdateUserSocial',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang ,facebook , twitter , contact_phone , contact_email , detailes }
        }).then(response => {
            if (response.data.success) {

                navigation.navigate('profile')

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
