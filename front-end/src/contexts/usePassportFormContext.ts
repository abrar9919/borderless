import { useContext } from "react";
import { PassportFormContext } from "./PassportFormContext";

export function usePassportContext() {
  const context = useContext(PassportFormContext);

  if (!context) {
    throw new Error(
      "The Context must be used within a PassportContextProvider"
    );
  }

  return context;
}
