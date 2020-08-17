import axios from "axios";
import CONST from "../consts";


export const getAdTerms = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'adTermsConditions',
            method      : 'POST',
            data        : { lang },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getAdTerms', payload: response.data});
        });
    }
};
