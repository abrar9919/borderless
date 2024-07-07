import { CSSProperties } from "react";
import { FileUploader } from "react-drag-drop-files";

interface DragAndDropFileInputProps {
  handleChange: (file: File) => void;
  name: string;
  fileTypes: string[];
  multiple: boolean;
  disabled: boolean;
  hoverTitle?: string;
  maxSize?: number; //Max size of files in mb
  minSize?: number; // Min size of files in mb
  onSizeError?: (file: File) => void;
  onTypeError?: (err: string) => void;
  onDrop?: (file: File) => void;
  onSelect?: (file: File) => void;
  children: React.ReactNode;
  dropMessageStyle: CSSProperties;
}

export default function DragAndDropFileInput({
  handleChange,
  fileTypes,
  name,
  multiple,
  disabled,
  hoverTitle,
  minSize,
  maxSize,
  onSizeError,
  onTypeError,
  onDrop,
  onSelect,
  children,
  dropMessageStyle,
}: DragAndDropFileInputProps) {
  return (
    <>
      <FileUploader
        handleChange={handleChange}
        name={name}
        types={fileTypes}
        multiple={multiple}
        disabled={disabled}
        hoverTitle={hoverTitle}
        minSize={minSize}
        maxSize={maxSize}
        onSizeError={onSizeError}
        onTypeError={onTypeError}
        onDrop={onDrop}
        onSelect={onSelect}
        dropMessageStyle={dropMessageStyle}
      >
        {children}
      </FileUploader>
    </>
  );
}
