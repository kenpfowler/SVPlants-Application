import { combineReducers } from "redux";
import { plantReducer } from "./plants/plant.reducer";

const rootReducer = combineReducers({
  plants: plantReducer,
});

export default rootReducer;
