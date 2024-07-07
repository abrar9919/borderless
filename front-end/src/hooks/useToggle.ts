import { useState } from "react";

export default function useToggle(initialValue = false) {
  const [toggle, setToggle] = useState(initialValue);

  function onToggle() {
    setToggle(!toggle);
  }
  function close() {
    setToggle(false);
  }

  function open() {
    setToggle(true);
  }
  return { toggle, onToggle, open, close };
}
