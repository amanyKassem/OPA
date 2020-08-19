const INITIAL_STATE = { userAds : {}, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getUserAds':
            return {
                userAds: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
