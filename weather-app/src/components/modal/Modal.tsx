import React, { useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  useBg?: boolean;
}

const Modal = ({ children, onClose, isOpen, useBg }: ModalProps) => {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;

  useEffect(() => {
    if (!modalRoot || !isOpen) return;

    const scrollY = window.scrollY;
    const scrollBar = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.cssText = `
      position: fixed;
      top: -${scrollY}px;
      overflow-y: scroll;
      width: 100%;
      padding-right: ${scrollBar}px;`;

    return () => {
      document.body.style.cssText = "";
      window.scrollTo(0, scrollY);
    };
  }, [modalRoot, isOpen]);

  if (!isOpen || !modalRoot) return null;

  const handleBgClick = useBg
    ? onClose
    : (e: React.MouseEvent) => e.stopPropagation();

  return ReactDOM.createPortal(
    useBg ? (
      <ModalBg onClick={handleBgClick}>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </ModalBg>
    ) : (
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    ),
    modalRoot
  );
};

export default Modal;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
