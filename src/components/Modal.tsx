import { ModalType } from "@/lib/type";

const Modal = ({ isOpen, onClose, onConfirm, message }: ModalType) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
        <h2 className="text-xl font-semibold">Budget Alert!</h2>
        <p className="mt-4">{message}</p>
        <div className="mt-6 flex justify-end gap-5">
          <button
            onClick={onClose}
            className="px-4 py-2  text-red-500 rounded-md "
          >
            Close
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
