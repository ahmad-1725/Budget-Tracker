import React from "react";

const ConfirmModal = ({ onConfirm, onCancel, category }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white text-black p-6 rounded-xl">
        <h2 className="text-lg font-bold mb-4">
          Delete {category==="expense"? "Expense" : "Income"}
        </h2>

        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Yes
          </button>

          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;