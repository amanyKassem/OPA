import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const StoreAd = (lang , category_id , city_id , Latitude , Longitude , address , title_ar , title_en ,
                        description_ar , description_en , price , space, rent_id , type_id , hall , floor , rooms ,
                        age , street_view , bathroom , meter_price , publication,
                        features , images ,token , navigation) => {
    alert(lang)
    return (dispatch) => {
        axios({
            url         : CONST.url + 'storeAd',
            method      : 'POST',
            data        : {lang , category_id , city_id , Latitude , Longitude , address , title_ar , title_en ,
                description_ar , description_en , price , space, rent_id , type_id , hall , floor , rooms ,
                age , street_view , bathroom , meter_price , publication,
                features , images},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'StoreAd', payload: response.data});
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
