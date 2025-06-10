import React from "react";
import styles from "./Datagrid.module.css";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: T[keyof T] | undefined, row: T) => React.ReactNode;
}

interface Props<T extends object> {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T;
}

export function Datagrid<T extends object>({ columns, data, rowKey }: Props<T>) {
  return (
    <div className={styles.fadeIn}>
      <table className={styles.dataGrid}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={String(row[rowKey])}>
              {columns.map((col) => {
                let value: T[keyof T] | undefined;

                if (typeof col.key === "string" && col.key in row) {
                  value = row[col.key as keyof T];
                } else {
                  value = undefined;
                }
                let content;

                if (col.render) {
                  content = col.render(value, row);
                } else if (Array.isArray(value)) {
                  content = value
                    .map((v) =>
                      typeof v === "object" && v !== null && "name" in v ? v.name : String(v)
                    )
                    .join(", ");
                } else if (typeof value === "object" && value !== null) {
                  content = JSON.stringify(value);
                } else {
                  content = String(value);
                }

                return <td key={String(col.key)}>{content}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
