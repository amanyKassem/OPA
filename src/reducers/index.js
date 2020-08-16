import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import profile from './ProfileReducer';
import countries from './CountriesReducer';
import userData from './UserDataReducer';
import notifications from './NotificationsReducer';

export default combineReducers({
    lang,
    auth,
    profile,
    countries,
    userData,
    notifications,
});
