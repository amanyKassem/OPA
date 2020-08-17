const INITIAL_STATE = { rents : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getRents':
            return {
                rents: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
