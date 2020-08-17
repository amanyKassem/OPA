const INITIAL_STATE = { adFees : '', loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getAdFees':
            return {
                adFees: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
