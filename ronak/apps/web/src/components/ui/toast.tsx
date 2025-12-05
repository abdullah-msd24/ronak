import React from 'react';
import { ToastProvider, useToast } from 'react-toast-notifications';

const Toast = () => {
  const { addToast } = useToast();

  const showToast = (message, type = 'info') => {
    addToast(message, { appearance: type, autoDismiss: true });
  };

  return { showToast };
};

const ToastWrapper = ({ children }) => {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
};

export { Toast, ToastWrapper };