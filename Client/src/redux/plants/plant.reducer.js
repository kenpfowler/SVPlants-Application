import { PlantActionTypes } from "./plant.types";
import { updateWateredPlants } from "./plant.utils";

const INITIAL_STATE = {
  plants: [],
  isFetching: false,
  errorMessage: null,
  selectedPlantsToWater: [],
};

export const plantReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlantActionTypes.FETCH_PLANTS_START:
      return { ...state, isFetching: true };
    case PlantActionTypes.FETCH_PLANTS_SUCCESS:
      return { ...state, plants: action.payload, isFetching: false };
    case PlantActionTypes.FETCH_PLANTS_FAILURE:
      return { ...state, errorMessage: action.payload, isFetching: false };
    case PlantActionTypes.SELECT_PLANTS_TO_WATER:
      return { ...state, selectedPlantsToWater: action.payload };
    case PlantActionTypes.WATER_PLANTS:
      return updateWateredPlants(state, action.payload);
    default:
      return state;
  }
};

export default plantReducer;
