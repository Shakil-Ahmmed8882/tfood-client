

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"; 
import React from "react";

import success_icon from "@/assets/icons/img/success_icon.gif"
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  isFooter?: boolean;
}

export const SuccessModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  icon,
  title,
  description,
  buttonText = "Close",
  isFooter = true
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-center">
                {icon ? (
                  icon 
                ) : (
                  <img
                    src={success_icon}
                    alt={"success icon"}
                    className="rounded-full w-36 mb-4 h-36 pb-3"
                  />
                )}
              </div>
              <h2 className="text-xl font-bold mb-2">{title}</h2>
              <p className="text-gray-500 text-sm mb-6">{description}</p>
            {
                isFooter && 
                <Button onClick={onClose} className="w-full py-5 mt-2 rounded-full text-black cursor-pointer hover:bg-amber-400 bg-amber-300">
                {buttonText}
              </Button>
            }
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
