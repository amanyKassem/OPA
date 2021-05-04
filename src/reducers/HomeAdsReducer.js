const INITIAL_STATE = { homeAds : [], loader : false, lastLocation: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getHomeAds':
            return {
                ...state,
                homeAds: action.payload.data,
                loader: action.payload.success,
            };

        case 'last_location':
            return {
                ...state,
                lastLocation: action.payload,
            };
        default:
            return state;
    }
};
