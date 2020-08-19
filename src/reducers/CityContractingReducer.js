const INITIAL_STATE = { cityContracting : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCityContracting':
            return {
                cityContracting: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
