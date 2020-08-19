const INITIAL_STATE = { types : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getTypes':
            return {
                types: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
