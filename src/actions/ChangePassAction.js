import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const changePass = (lang , old_password , new_password , token , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'ChangePassword',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang ,old_password , new_password }
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
