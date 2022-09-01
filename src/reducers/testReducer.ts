const initialState = {
    test: ""
};

const testReducer = (state = initialState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case testReducerActions.UPDATE_TEST:
            return {
                ...state,
                test: action.payload
            };
        case testReducerActions.CLEAR_TEST:
            return {
                ...state,
                test: initialState.test
            };
        default:
            return state
    }
}

export const testReducerActions = {
    UPDATE_TEST: "UPDATE_TEST",
    CLEAR_TEST: "CLEAR_TEST",
}

export default testReducer;