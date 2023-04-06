import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

/**
 * LoadingCmp is used to signify a loading process
 * @param {*} isLoading When isLoading is true, a circular progress gets displayed on the page to signify a loading process
 * @returns a circular progress
 */

export function LoadingCmp(isLoading) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
