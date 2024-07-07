import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ReactPortal } from "react";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  children: JSX.Element | ReactPortal | boolean | null | undefined;
}
export default function Modal({ isOpen, close, children }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 duration-300 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full md:w-8/12 space-y-4 bg-slate-50 p-12 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 rounded-md"
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
