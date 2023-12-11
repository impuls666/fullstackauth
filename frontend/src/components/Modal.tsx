import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="modal-content">
          {/* Input fields for firstname and lastname */}
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              className="mt-1 p-2 w-full border rounded-md dark:bg-gray-700"
              placeholder="Enter first name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              className="mt-1 p-2 w-full border rounded-md dark:bg-gray-700"
              placeholder="Enter last name"
            />
          </div>
          {/* Additional content for editing user */}
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
