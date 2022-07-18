import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ImageModal = ({ visible, name, closeCallback }) => {
  return (
    <Modal open={visible} onClose={closeCallback}>
      <Box sx={style}>
        <img src={`http://contest.elecard.ru/frontend_data/${name}`} alt="" />
      </Box>
    </Modal>
  );
};

export default ImageModal;
