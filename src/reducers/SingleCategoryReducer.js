const INITIAL_STATE = { singleCategory : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getSingleCategory':
            return {
                singleCategory: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
