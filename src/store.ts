import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import ReduxThunk from "redux-thunk";

const logger = (store: any) => (next: Function) => (action: any) => {
    if (process.env.NODE_ENV !== "development") return next(action);
    console.group(action.type ? action.type : "THUNK");
    console.info("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
};

//TODO move to redux-toolkit configureStore
const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger));

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

