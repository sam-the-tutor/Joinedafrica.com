import { Alert, Snackbar } from "@mui/material";

import React from "react";

/**
 * SnackbarCmp is used to display success or error messages.
 */
export default function SnackbarCmp({
  message,
  handleClose,
  severity = "success",
}) {
  function getBackgroundColour(severity) {
    if (severity === "info") {
      return "#0288d1";
    }
    if (severity === "success") {
      return "#2e7d32";
    }
  }
  return (
    <Snackbar open={true} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          width: "100%",
          backgroundColor: getBackgroundColour(severity),
          color: "white",
          fontWeight: "bold",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
