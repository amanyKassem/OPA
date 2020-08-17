const INITIAL_STATE = { homeAds : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getHomeAds':
            return {
                homeAds: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
