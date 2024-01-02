import { combineReducers } from "redux";
import streamsReducer from "./streamsReducer";
import callStatusReducer from "./callStatusReducer";

const rootReducer = combineReducers({
    callStatus: callStatusReducer,
    streams: streamsReducer
});


export default rootReducer;