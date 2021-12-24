import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { connect } from "react-redux";
import {
  fetchPlantStartAsync,
  selectPlantsToWater,
} from "../redux/plants/plant.actions";
import WateringMeter from "./watering-meter.component";

const PlantTable = (props) => {
  const { plants, isFetching, fetchPlantStartAsync, selectPlantsToWater } =
    props;

  const [plantsToWater, setPlantsToWater] = useState([]);

  useEffect(() => {
    fetchPlantStartAsync();
  }, [fetchPlantStartAsync]);

  useEffect(() => {
    selectPlantsToWater(plantsToWater);
  }, [plantsToWater, selectPlantsToWater]);

  const columns = [
    { field: "id", headerName: "Id", width: 50 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "wateredDate", headerName: "Watered Date", width: 300 },
    { field: "prettyWateredDate", headerName: "Last Watered", width: 150 },
    { field: "needsWater", headerName: "Water Now", width: 150 },
    {
      field: "needsRest",
      headerName: "Needs Rest",
      width: 150,
      sortable: false,
      valueGetter: (params) => {
        const rowTime = new Date(params.row.wateredDate);
        const currentTime = new Date();
        const diffTime = Math.abs((currentTime - rowTime) / 1000);
        return diffTime >= 30 ? "No" : "Yes";
      },
    },
  ];

  return isFetching ? (
    <div>One moment please...</div>
  ) : (
    <div style={{ height: 400, width: "100%" }}>
      <div
        style={{
          display: "flex",
          height: "100%",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            isRowSelectable={(params) => {
              const rowTime = new Date(params.row.wateredDate);
              const currentTime = new Date();
              const diffTime = Math.abs((currentTime - rowTime) / 1000);
              return diffTime >= 30 ? true : false;
            }}
            hideFooter
            rows={plants.plants}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(rowIds) => {
              setPlantsToWater(rowIds);
            }}
            // selectionModel={}
          />
        </div>
      </div>
      <WateringMeter plants={plants} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plants: state.plants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlantStartAsync: () => {
      dispatch(fetchPlantStartAsync());
    },
    selectPlantsToWater: (plantsToWater) => {
      dispatch(selectPlantsToWater(plantsToWater));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlantTable);
