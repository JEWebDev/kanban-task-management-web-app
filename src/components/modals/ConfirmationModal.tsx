import SecondaryButton from "../shared/buttons/SecondaryButton";

// components/modals/ConfirmationModal.tsx
interface ConfirmationModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
  isPending?: boolean;
}

export default function ConfirmationModal({
  title,
  description,
  onConfirm,
  onClose,
  isPending,
}: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black-400 p-8 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-red-500 heading-l mb-6">{title}</h2>
        <p className="text-grey-300 body-l mb-8">{description}</p>

        <div className="flex flex-col md:flex-row gap-4">
          <SecondaryButton
            onClick={onConfirm}
            disabled={isPending ?? false}
            className="flex-1 bg-red-500 text-white py-2.5 rounded-3xl hover:bg-red-300 disabled:opacity-50 transition-colors"
          >
            {isPending ? "Deleting..." : "Delete"}
          </SecondaryButton>
          <SecondaryButton
            onClick={onClose}
            disabled={isPending ?? false}
            className="flex-1 bg-purple-100 text-purple-500 py-2.5 rounded-3xl hover:bg-purple-200 transition-colors"
          >
            Cancel
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
