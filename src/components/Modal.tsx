import { ReactNode, useEffect, MouseEvent } from "react";
import { XIcon } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

/**
 * A reusable modal component that displays content in an overlay.
 * The modal can be closed by clicking the close button, pressing the 'Escape' key,
 * or clicking outside the modal content area.
 *
 * @component
 * @example
 * <Modal isOpen={isModalOpen} onClose={handleClose} title="Modal Title">
 *   <p>Modal Content</p>
 * </Modal>
 */
export default function Modal({
  isOpen,
  onClose,
  icon,
  title,
  children,
}: ModalProps) {
  // To close modal on 'Escape' key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // To prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  /**
   * Handles click events on the overlay.
   * Closes the modal if the click is outside the modal content.
   *
   * @param event - The mouse event
   */
  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    // If the event target is the overlay itself (not a child), close the modal
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-70 p-0 md:items-center md:p-0"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-full max-w-2xl overflow-auto rounded-t-2xl bg-card p-4 shadow-lg md:min-h-96 md:rounded-2xl md:p-6"
        role="document"
      >
        <button
          className="absolute right-4 top-4 text-gray-600 hover:text-primary"
          onClick={onClose}
          aria-label="Close modal"
        >
          <XIcon className="size-5" />
        </button>
        <div className="divide-y">
          <div className="text-muted-primary mb-4 flex items-center gap-2">
            <h2
              id="modal-title"
              className="mb-4 flex items-center text-xl font-semibold"
            >
              {icon && <span className="mr-2">{icon}</span>}
              {title}
            </h2>
          </div>
          <div className="pt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
