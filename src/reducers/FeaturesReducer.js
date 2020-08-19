const INITIAL_STATE = { features : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFeatures':
            return {
                features: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
