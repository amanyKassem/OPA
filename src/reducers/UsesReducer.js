const INITIAL_STATE = { uses : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getUses':
            return {
                uses: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
