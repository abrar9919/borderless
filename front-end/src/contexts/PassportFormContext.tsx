// context/AppContext.tsx

import { ReactNode, createContext, useReducer } from "react";
import passportReducer, {
  Actions,
  State,
  initialState,
} from "../reducers/PassportReducer";

type AppContextType = {
  state: State;
  dispatch: React.Dispatch<Actions>;
};

// Create the context with an initial value of null
export const PassportFormContext = createContext<AppContextType | null>(null);

// Define the props type for the context provider component
type ContextProviderProps = {
  children: ReactNode;
};

// Define the provider component
function PassportContextProvider({ children }: ContextProviderProps) {
  const [state, dispatch] = useReducer(passportReducer, initialState);

  return (
    <PassportFormContext.Provider value={{ state, dispatch }}>
      {children}
    </PassportFormContext.Provider>
  );
}

export default PassportContextProvider;
