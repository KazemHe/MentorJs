import React from "react";
import { Box, Modal, Button } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function CustomModal({ open, handleClose, isCorrect }) {
  let title, description, emoji;

  if (isCorrect) {
    title = "Congratulations!";
    description = "Your code is correct. Well done!";
    emoji = "🎉"; // Emoji for celebration
  } else {
    title = "Oops!";
    description = "Your code is incorrect. Please try again.";
    emoji = "😔"; // Emoji for disappointment
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title">{title}</h2>
        <p id="modal-description">
          {description}
        </p>
        <div style={{ fontSize: "5rem", textAlign: "center" }}>
          {emoji}
        </div>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
}

export default CustomModal;
