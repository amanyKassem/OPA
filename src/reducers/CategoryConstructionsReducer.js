const INITIAL_STATE = { categoryConstructions : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCategoryConstructions':
            return {
                categoryConstructions: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
