import React, { useEffect, useRef } from "react";
import { ModalProps } from "../types";

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Store the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus the modal for accessibility
      setTimeout(() => {
        modalRef.current?.focus();
      }, 0);

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      if (isOpen) {
        document.body.style.overflow = "";
        // Restore focus when modal closes
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      }
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Trap focus within modal
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          event.preventDefault();
        }
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease-out]"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.2)] max-w-[90vw] max-h-[90vh] w-96 min-h-[200px] relative overflow-hidden animate-[slideUp_0.3s_ease-out] outline-none"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className="relative p-4 pb-0 flex justify-end">
          <button
            className="w-8 h-8 border-none bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10 hover:text-gray-800 dark:hover:text-white hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            <span className="text-xl leading-none font-light">×</span>
          </button>
        </div>
        <div className="px-5 pb-5 overflow-y-auto max-h-[calc(90vh-60px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
