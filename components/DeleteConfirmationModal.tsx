'use client';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  qrCodeName?: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  qrCodeName,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Are You Sure You Want to Delete This QR Code?
        </h3>

        {/* Body Text */}
        <p className="text-gray-600 mb-6">
          This action will permanently remove the QR code and its data. You won't be able to recover
          it once deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-gray-700 font-medium transition-all hover:bg-gray-100"
            style={{ backgroundColor: 'rgba(83, 79, 235, 0.1)', color: '#534FEB' }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 rounded-lg text-white font-medium bg-red-600 transition-all hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

