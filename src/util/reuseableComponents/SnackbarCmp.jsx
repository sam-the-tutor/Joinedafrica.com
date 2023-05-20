import { Alert, Snackbar } from "@mui/material";

import React from "react";

/**
 * SnackbarCmp is used to display success or error messages.
 */
export default function SnackbarCmp({ message, open, handleClose, severity }) {
  return (
    <Snackbar open={open} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={
          severity == "success"
            ? { width: "100%", backgroundColor: "#2e7d32" }
            : { width: "100%", backgroundColor: "#d32f2f" }
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
