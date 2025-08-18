import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import PropTypes from "prop-types";
import "./confirmModal.scss";

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  text,
  type = "success",
  timeout,
}) => {
  const modalRef = useRef();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!timeout || !open) return;

    setProgress(100); // reset progress bar
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.max(0, 100 - (elapsed / timeout) * 100);
      setProgress(percent);
      if (percent <= 0) {
        clearInterval(interval);
        onClose();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [timeout, open]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <AnimatePresence>
        <motion.div
          ref={modalRef}
          className={`confirm-modal ${type} ${!timeout ? "with-top" : ""}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
        >
          {timeout && (
            <div className="progress-container">
              <div
                className={`progress-bar ${type}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          <div className="modal-icon">
            {type === "success" ? (
              <CheckCircleIcon className="icon success-icon" />
            ) : type === "error" ? (
              <ErrorIcon className="icon error-icon" />
            ) : (
              <WarningAmberRoundedIcon className="icon warning-icon" />
            )}
          </div>
          <p>{text}</p>
          <div className="btns">
            <button className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="confirm" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>,
    document.body
  );
};

ConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning"]),
  timeout: PropTypes.number,
};

export default ConfirmModal;
