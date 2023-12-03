import React from "react";
import { Box, Modal, Button, useMediaQuery } from "@mui/material";

const CustomModal = ({ open, handleClose, isCorrect }) => {
  const isMobile = useMediaQuery('(max-width:500px)'); // Adjust breakpoint as needed

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '80%' : 400, // Adjust width for mobile
    maxWidth: '90%', // Set maximum width
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

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
        <div style={{ fontSize: isMobile ? "3rem" : "5rem", textAlign: "center" }}>
          {emoji}
        </div>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
}

export default CustomModal;
