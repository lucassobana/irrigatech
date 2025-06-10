import React from "react";
import styles from "./Modal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button className={styles.closeModal} onClick={onClose}>×</button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
