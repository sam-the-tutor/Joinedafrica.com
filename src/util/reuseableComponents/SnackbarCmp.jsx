import { Alert, Snackbar } from "@mui/material";

import React from "react";

/**
 * SnackbarCmp is used to display success or error messages.
 */
export default function SnackbarCmp({ message, handleClose }) {
  return (
    <Snackbar open={true} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{
          width: "100%",
          backgroundColor: "#2e7d32",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
