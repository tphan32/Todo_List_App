import React, {useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton/IconButton";
import Container from "@mui/material/Container/Container";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  flexDirection: "column",
  gap: 1
};

interface ConfirmModalProps {
  modalType: string;
  confirm: () => void;
}

export default function ConfirmModal({ modalType, confirm }: ConfirmModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prevState) => !prevState);
  const handleClose = () => setOpen((prevState) => !prevState);
  let DisplayModal: React.FunctionComponent = () => null;
  let modalTitle = "";
  if (modalType === "delete") {
    modalTitle = "Delete Task";
    DisplayModal = () => (
      <IconButton aria-label="delete" onClick={() => handleOpen()}>
        <DeleteIcon />
      </IconButton>
    );
  }

  return (
    <Box>
      <DisplayModal />
      <Modal open={open} onClose={handleClose}>
        <Box display="flex" sx={style}>
          <Typography variant="h6" component="h2">
            {modalTitle}
          </Typography>
          <Typography gutterBottom>
            Are you sure you want to continue?
          </Typography>
          <Box display="flex" className="justify-stretch">
            <Button fullWidth variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button fullWidth variant="contained" color="error" onClick={confirm}>Confirm</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
