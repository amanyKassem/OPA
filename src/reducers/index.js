import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import profile from './ProfileReducer';
import countries from './CountriesReducer';
import userData from './UserDataReducer';
import notifications from './NotificationsReducer';
import about from './AboutReducer';
import favourite from './FavouriteReducer';
import authUserAds from './AuthUserAdsReducer';
import faq from './FaqReducer';
import adFees from './AdFeesReducer';
import contact from './ContactReducer';
import terms from './TermsReducer';
import adTerms from './AdTermsReducer';
import homeAds from './HomeAdsReducer';
import search from './SearchReducer';
import categories from './CategoriesReducer';
import rents from './RentsReducer';

export default combineReducers({
    lang,
    auth,
    profile,
    countries,
    userData,
    notifications,
    about,
    favourite,
    authUserAds,
    faq,
    adFees,
    contact,
    terms,
    adTerms,
    homeAds,
    search,
    categories,
    rents,
});
