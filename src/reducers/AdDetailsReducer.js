const INITIAL_STATE = { adDetails : null, editAdDetails : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getAdDetails':
            return {
                adDetails: action.payload.data,
                loader: action.payload.success
            };
        case 'getEditAdDetails':
            return {
                editAdDetails: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
