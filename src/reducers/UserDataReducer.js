const INITIAL_STATE = { userData : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getUserData':
            return {
                userData: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
