const INITIAL_STATE = { authUserAds : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getAuthUserAds':
            return {
                authUserAds: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
