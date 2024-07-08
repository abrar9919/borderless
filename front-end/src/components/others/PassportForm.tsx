import { Button } from "@headlessui/react";
import { usePassportContext } from "../../contexts/usePassportFormContext";
import { ActionTypes } from "../../reducers/PassportReducer";
import DragAndDropFileInput from "../reusable/DragAndDropFileInput";
import InputWithLabel from "../reusable/InputWithLabel";
import { useMutation } from "@tanstack/react-query";
import FieldWithScore from "../reusable/FieldWithScore";

interface DocumentVerificationResponse {
  data: FieldScore[];
}

interface FieldScore {
  value: string;
  confidenceScore: string;
  field: string;
}
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const fileTypes = ["JPG", "PNG", "PDF"];

export default function PassportForm() {
  const { dispatch, state } = usePassportContext();
  const { name, nameError, passportFile, passportFileError } = state;

  const { mutate, isSuccess, isError, data, error, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${SERVER_URL}/verify-passport-details/`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      return (await response.json()) as DocumentVerificationResponse;
    },
  });

  const isPassportFormDisabled = !!passportFile || isPending;

  const handleSubmit = async () => {
    if (!name)
      dispatch({
        type: ActionTypes.NAME_ERROR,
        payload: "Name must not be empty.",
      });

    if (!passportFile)
      dispatch({
        type: ActionTypes.PASSPORT_ERROR,
        payload: "An image of your passport is required.",
      });

    if (name && passportFile) {
      const formData = new FormData();
      formData.append("passportFile", passportFile);
      formData.append("name", name);
      mutate(formData);
    }
  };

  if (isSuccess && data)
    return (
      <>
        <h2>Validated Fields:</h2>
        {data.data.map(({ confidenceScore, field, value }) => (
          <FieldWithScore
            confidenceScore={confidenceScore}
            field={field}
            value={value}
          />
        ))}
      </>
    );

  return (
    <>
      <div className="pb-8">
        <InputWithLabel
          onChange={(event) => {
            event.preventDefault();
            dispatch({
              type: ActionTypes.CHANGE_NAME,
              payload: event.target.value,
            });
          }}
          label="Name"
          name="name"
          value={name}
          type="text"
          inputClass="border w-full px-2 rounded-md mt-2 h-8 data-[hover]:shadow data-[focus]:bg-blue-100"
        />
        {nameError && <p className="text-red-500">{nameError}</p>}
      </div>
      <DragAndDropFileInput
        handleChange={(file) => {
          dispatch({ type: ActionTypes.ADD_FILE, payload: file });
        }}
        dropMessageStyle={
          isPassportFormDisabled
            ? { background: "#000422", border: 0, color: "white" }
            : {}
        }
        name="passport"
        fileTypes={fileTypes}
        multiple={false}
        disabled={isPassportFormDisabled}
        hoverTitle={
          isPassportFormDisabled
            ? "You can upload one file at a time"
            : "Drop your file here..."
        }
      >
        <div className="bg-gray-100 py-4 h-32 border border-gray-200 border-dashed rounded-md">
          <p className="text-center">
            {passportFile
              ? "Thank you for uploading an image of your passport"
              : "Upload your passport image here."}
          </p>
        </div>
      </DragAndDropFileInput>
      {passportFile && (
        <div className="py-2 flex items-center justify-between">
          <p>{passportFile?.name}</p>
          <Button
            className="bg-red-600 px-6 py-2 rounded-md text-white"
            onClick={() => {
              dispatch({ type: ActionTypes.REMOVE_FILE, payload: null });
            }}
          >
            Delete
          </Button>
        </div>
      )}
      {passportFileError && <p className="text-red-500">{passportFileError}</p>}
      {isError && <p className="text-red-500 text-center">{error.message}</p>}
      <div className="flex justify-center">
        <Button
          className="bg-sky-400 px-6 py-2 rounded-md text-white disabled:bg-gray-400"
          disabled={isPending}
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </div>
    </>
  );
}
