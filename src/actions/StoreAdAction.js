import axios from "axios";
import CONST from "../consts";


export const StoreAd = (lang , category_id , city_id , Latitude , Longitude , address , title_ar , title_en ,
                        description_ar , description_en , price , space, rent_id , type_id , hall , floor , rooms ,
                        age , street_view , bathroom , meter_price , publication,
                        features , images ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'storeAd',
            method      : 'POST',
            data        : { lang },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'StoreAd', payload: response.data});
        });
    }
};
