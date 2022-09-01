import {testReducerActions} from "../reducers/testReducer";

export const updateTest = (test: string) => {
    return {
        type: testReducerActions.UPDATE_TEST,
        payload: test
    }
}

export const clearTest = () => {
    return {
        type: testReducerActions.CLEAR_TEST,
    }
}