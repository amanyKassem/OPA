const INITIAL_STATE = { adTerms : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getAdTerms':
            return {
                adTerms: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
