import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LinearProgress } from "@mui/material";
import Modal from "@mui/material/Modal";
import { connect } from "react-redux";
import { waterPlants } from "../redux/plants/plant.actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const WateringMeter = (props) => {
  const { plants, waterPlants } = props;

  const [time, setTime] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setTime(0);
    setOpen(true);
  };
  const handleClose = () => {
    setTime(0);
    setOpen(false);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 1);
    }, 1000);
    if (time === 10) {
      waterPlants(plants.selectedPlantsToWater);
      setTime(10);
      setOpen(false);
    }
    return () => clearTimeout(timer);
  }, [time, waterPlants, plants.selectedPlantsToWater]);

  return (
    <div>
      <Button
        variant="outlined"
        disabled={plants.selectedPlantsToWater.length === 0}
        onClick={handleOpen}
      >
        Water Plants
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={time * 10} />
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {plants.selectedPlantsToWater.length} plant(s) are being watered.
          </Typography>
          <Typography align="center">
            Please wait for watering to be complete or click stop watering to
            cancel.
          </Typography>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Stop Watering
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    waterPlants: (ids) => {
      dispatch(waterPlants(ids));
    },
  };
};

export default connect(null, mapDispatchToProps)(WateringMeter);
