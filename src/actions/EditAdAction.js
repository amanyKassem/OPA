import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const EditAd = (lang , ad_id , category_id  , Latitude , Longitude , address , features , title_ar ,
                        description_ar ,  rent_id , type_id , publication, images ,token , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'editAd',
            method      : 'POST',
            data        : {lang , ad_id , category_id  , Latitude , Longitude , address , features , title_ar ,
                description_ar ,  rent_id , type_id , publication, images},
            headers     : {Authorization: token}
        }).then(response => {
            if (response.data.success){
                navigation.navigate('confirmPost');
            }

            Toast.show({
                text        	: response.data.message,
                type			: response.data.success ? "success" : "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'cairo',
                    textAlign   	: 'center'
                }
            });
        });
    }
};
