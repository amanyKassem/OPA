import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const EditAd = (lang , ad_id , category_id , city_id , Latitude , Longitude , address , features , title_ar , title_en ,
                        description_ar , description_en , price , space, rent_id , type_id , hall , floor , rooms ,
                        age , street_view , bathroom , meter_price , publication, images ,token , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'editAd',
            method      : 'POST',
            data        : {lang , ad_id , category_id , city_id , Latitude , Longitude , address , features , title_ar , title_en ,
                description_ar , description_en , price , space, rent_id , type_id , hall , floor , rooms ,
                age , street_view , bathroom , meter_price , publication, images},
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
