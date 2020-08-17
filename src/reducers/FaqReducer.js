const INITIAL_STATE = { faq : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFaq':
            return {
                faq: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
