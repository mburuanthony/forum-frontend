import { createContext, useContext, useState } from "react";

const progresbarContext = createContext();

export function useProgressBar() {
  return useContext(progresbarContext);
}

export function ProgressBarProvider({ children }) {
  const [fileUrl, setFileUrl] = useState(null);

  const value = {
    fileUrl,
    setFileUrl,
  };

  return (
    <progresbarContext.Provider value={value}>
      {children}
    </progresbarContext.Provider>
  );
}
