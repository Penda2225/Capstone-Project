import { useEffect } from "react";

function Toast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-5 right-5 bg-purple-800 text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
}

export default Toast;
 
