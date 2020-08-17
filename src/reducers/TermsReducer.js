const INITIAL_STATE = { terms : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getTerms':
            return {
                terms: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
