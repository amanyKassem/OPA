import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const AddAdOrder = (lang , category_id , rent_id , type_id , Latitude , Longitude , rooms , hall , bathroom , floor , age ,detailes ,notify , features , token , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'addAdOrder',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang , category_id , rent_id , type_id , Latitude , Longitude , rooms , hall , bathroom , floor , age ,detailes ,notify , features }
        }).then(response => {
            if (response.data.success) {

                navigation.navigate('contracting')

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
