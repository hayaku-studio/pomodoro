import React, { useRef, useEffect } from "react";
import { IoTimeOutline, IoSettingsOutline } from "react-icons/io5";

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onTimerClick: () => void;
  onSettingsClick: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  onClose,
  onTimerClick,
  onSettingsClick,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="animate-in slide-in-from-top-2 absolute top-full right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl duration-200 dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="py-1">
        <button
          onClick={() => {
            onTimerClick();
            onClose();
          }}
          className="group flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-all duration-200 hover:cursor-pointer hover:bg-red-50 hover:text-red-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-red-400"
        >
          <IoTimeOutline className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
          Timer
        </button>
        <button
          onClick={() => {
            onSettingsClick();
            onClose();
          }}
          className="group flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-all duration-200 hover:cursor-pointer hover:bg-red-50 hover:text-red-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-red-400"
        >
          <IoSettingsOutline className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
          Settings
        </button>
      </div>
    </div>
  );
};

export default DropdownMenu;
