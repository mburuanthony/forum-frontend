import { createContext, useContext, useState } from "react";

const snackBarContext = createContext();

export function useSnackBar() {
  return useContext(snackBarContext);
}

export function SnackBarProvider({ children }) {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const value = {
    snackBarOpen,
    setSnackBarOpen,
    snackBarMessage,
    setSnackBarMessage,
  };

  return (
    <snackBarContext.Provider value={value}>
      {children}
    </snackBarContext.Provider>
  );
}
