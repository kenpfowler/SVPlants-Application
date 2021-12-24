import moment from "moment";
export const formatPlantWateredDate = (data) => {
  const formattedData = data.map((plant) => {
    return { ...plant, prettyWateredDate: moment(plant.wateredDate).fromNow() };
  });
  return formattedData;
};

export const updateWateredPlants = (state, ids) => {
  const { plants } = state;
  const wateredPlants = plants.map((plant) =>
    ids.find((id) => id === plant.id)
      ? {
          ...plant,
          wateredDate: moment().format(),
          prettyWateredDate: moment().fromNow(),
          needsWater: false,
        }
      : plant
  );
  // modifying selected plants to water here is setting off an infinite loop
  return { ...state, plants: wateredPlants };
};
