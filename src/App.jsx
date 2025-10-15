import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";

function App() {
  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Container for padding + centering */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Home />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
