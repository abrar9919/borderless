import { Button } from "@headlessui/react";
import useToggle from "./hooks/useToggle";
import Modal from "./components/reusable/Modal";
import PassportForm from "./components/others/PassportForm";
import { usePassportContext } from "./contexts/usePassportFormContext";
import { ActionTypes } from "./reducers/PassportReducer";
function App() {
  const { toggle, onToggle, close } = useToggle(false);
  const { dispatch } = usePassportContext();

  return (
    <div className="px-4 py-8 bg-slate-100 h-[100vh]">
      <h1 className="text-center">Borderless Password Verification Platform</h1>
      <div className="flex justify-center pt-6">
        <Button
          onClick={() => onToggle()}
          className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700"
        >
          Start verification process
        </Button>
      </div>
      <Modal
        isOpen={toggle}
        close={() => {
          close();
          dispatch({
            type: ActionTypes.CLEAR_FORM,
            payload: null,
          });
        }}
      >
        <PassportForm />
      </Modal>
    </div>
  );
}

export default App;
