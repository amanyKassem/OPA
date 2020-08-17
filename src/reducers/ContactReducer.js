const INITIAL_STATE = { contact : {}, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getContactUs':
            return {
                contact: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
