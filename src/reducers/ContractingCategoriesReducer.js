const INITIAL_STATE = { contractingCat : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getContractingCategories':
            return {
                contractingCat: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
