const INITIAL_STATE = { constructionDetailes : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getConstructionDetailes':
            return {
                constructionDetailes: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
