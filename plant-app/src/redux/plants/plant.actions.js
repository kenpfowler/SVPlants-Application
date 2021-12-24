import { PlantActionTypes } from "./plant.types";
import RestDatasource from "../../services/rest-datasource";
import { formatPlantWateredDate } from "./plant.utils";

export const fetchPlantsStart = () => ({
  type: PlantActionTypes.FETCH_PLANTS_START,
});

export const fetchPlantsSuccess = (plants) => ({
  type: PlantActionTypes.FETCH_PLANTS_SUCCESS,
  payload: plants,
});

export const fetchPlantsFailure = (error) => ({
  type: PlantActionTypes.FETCH_PLANTS_FAILURE,
  payload: error,
});

export const fetchPlantStartAsync = () => {
  return async (dispatch) => {
    try {
      const data = await RestDatasource.FetchPlants();
      const formattedData = formatPlantWateredDate(data);
      dispatch(fetchPlantsStart());
      dispatch(fetchPlantsSuccess(formattedData));
    } catch (error) {
      dispatch(fetchPlantsFailure(error));
    }
  };
};

export const selectPlantsToWater = (ids) => ({
  type: PlantActionTypes.SELECT_PLANTS_TO_WATER,
  payload: ids,
});

export const waterPlants = (ids) => ({
  type: PlantActionTypes.WATER_PLANTS,
  payload: ids,
});

export const finishedWatering = () => ({
  type: PlantActionTypes.FINISH_WATERING_PLANTS,
});
