export enum ActionTypes {
  CHANGE_NAME = "CHANGE_NAME",
  ADD_FILE = "ADD_FILE",
  REMOVE_FILE = "REMOVE_FILE",
  PASSPORT_ERROR = "PASSPORT_ERROR",
  NAME_ERROR = "NAME_ERROR",
  CLEAR_FORM = "CLEAR_FORM",
}

export interface State {
  name: string;
  nameError: string;
  passportFile: File | null;
  passportFileError: string;
}

export type Actions =
  | { type: ActionTypes.CHANGE_NAME; payload: string }
  | { type: ActionTypes.ADD_FILE; payload: File }
  | { type: ActionTypes.REMOVE_FILE; payload: null }
  | { type: ActionTypes.PASSPORT_ERROR; payload: string }
  | { type: ActionTypes.NAME_ERROR; payload: string }
  | { type: ActionTypes.CLEAR_FORM; payload: null };
export const initialState: State = {
  name: "",
  nameError: "",
  passportFile: null,
  passportFileError: "",
};

function passportReducer(state: State, action: Actions): State {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.CHANGE_NAME:
      return {
        ...state,
        name: payload,
        nameError: "",
      };
    case ActionTypes.CLEAR_FORM:
      return initialState;

    case ActionTypes.NAME_ERROR:
      return {
        ...state,
        nameError: payload,
      };

    case ActionTypes.PASSPORT_ERROR:
      return {
        ...state,
        passportFileError: payload,
      };
    case ActionTypes.ADD_FILE:
      return {
        ...state,
        passportFile: payload,
        passportFileError: "",
      };

    case ActionTypes.REMOVE_FILE:
      return {
        ...state,
        passportFile: null,
      };
    default:
      return state;
  }
}

export default passportReducer;
