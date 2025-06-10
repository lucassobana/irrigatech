import React, { useState, useEffect, useMemo } from "react";
import styles from "./ModalForm.module.css";

interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "password" | "select" | "checkbox";
  required?: boolean;
  options?: FormFieldOption[];
}

interface ModalFormProps<T> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formFields: FormField[];
  onSubmit: (data: T) => void | Promise<void>;
  children?: React.ReactNode;
}

export function ModalForm<T>({
  isOpen,
  onClose,
  title,
  formFields,
  onSubmit,
  children,
}: ModalFormProps<T>) {
  const initialFormData = useMemo(() => {
    return formFields.reduce((acc: Record<string, string>, field) => {
      acc[field.name] = "";
      return acc;
    }, {});
  }, [formFields]);


  const [formData, setFormData] = useState<Record<string, string>>(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) setFormData(initialFormData);
  }, [isOpen, initialFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(formData as T);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar o formulário.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          {formFields.map(({ name, label, type, required, options }) => (
            <label key={name}>
              {label}:
              {type === "select" ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required={required}
                >
                  <option value="" disabled>
                    Selecione...
                  </option>
                  {options?.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              ) : type === "checkbox" ? (
                <input
                  name={name}
                  type="checkbox"
                  checked={formData[name] === "true"}
                  onChange={handleChange}
                  required={required}
                />
              ) : (
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  required={required}
                />
              )}
            </label>
          ))}
          
          {children}

          <div className={styles.formButtons}>
            <button type="submit" disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar"}
            </button>
            <button type="button" onClick={onClose} disabled={submitting}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
