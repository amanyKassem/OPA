const INITIAL_STATE = { ordersResults : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getOrdersResults':
            return {
                ordersResults: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
