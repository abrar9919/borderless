import { Field, Label, Input } from "@headlessui/react";

interface InputWithLabelProps {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  type: string;
  inputClass: string | undefined;
}

export default function InputWithLabel({
  name,
  label,
  value = "",
  onChange,
  type,
  inputClass,
}: InputWithLabelProps) {
  return (
    <Field>
      <Label>{label}</Label>
      <Input
        name={name}
        onChange={onChange}
        className={inputClass}
        value={value}
        type={type}
      />
    </Field>
  );
}
