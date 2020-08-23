const INITIAL_STATE = { storeAd : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'StoreAd':
            return {
                storeAd: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
