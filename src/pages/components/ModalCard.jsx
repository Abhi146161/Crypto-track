import { motion, AnimatePresence } from "framer-motion";

function ModalCard({ children, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.div
            className="
              bg-gradient-to-br from-gray-900/80 to-gray-800/80
              backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl
              p-6 w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto
              relative
            "
            initial={{ y: -50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="
                absolute top-4 right-4 text-white text-2xl font-bold
                hover:text-red-500 transition duration-300
              "
              whileHover={{ scale: 1.2, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              ×
            </motion.button>

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalCard;
