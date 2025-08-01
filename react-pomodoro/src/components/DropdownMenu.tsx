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
      className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200"
    >
      <div className="py-1">
        <button
          onClick={() => {
            onTimerClick();
            onClose();
          }}
          className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 flex items-center gap-3 group hover:cursor-pointer"
        >
          <IoTimeOutline className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
          Timer
        </button>
        <button
          onClick={() => {
            onSettingsClick();
            onClose();
          }}
          className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 flex items-center gap-3 group hover:cursor-pointer"
        >
          <IoSettingsOutline className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
          Settings
        </button>
      </div>
    </div>
  );
};

export default DropdownMenu;
