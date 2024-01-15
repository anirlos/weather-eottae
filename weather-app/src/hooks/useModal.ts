import { useCallback, useState } from "react";

interface ModalOption {
  useBg?: boolean;
}

const useModal = ({ useBg = true }: ModalOption = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, open, close, useBg };
};

export default useModal;
