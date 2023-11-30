import { createContext, useContext, useState } from 'react';

const LoginModalContext = createContext();

export const LoginModalProvider = ({ children }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <LoginModalContext.Provider value={{ isLoginModalOpen, openLoginModal, closeLoginModal }}>
      {children}
    </LoginModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(LoginModalContext);
};
