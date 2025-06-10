import React from "react";
import styles from "./FarmCard.module.css";
import teste from "../assets/Vector.svg"

interface Farm {
  id: number;
  name: string;
  userId: number;
  hasActivePivot: boolean;
}

interface Props {
  farm: Farm;
  onClick: () => void;
}

export const FarmCard: React.FC<Props> = ({ farm, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={teste} alt="Fazenda" />
      <div className={styles.info}>
        <div className={styles.name}>
          <span
            className={styles.status_dot}
            style={{ backgroundColor: farm.hasActivePivot ? "var(--green)" : "var(--red)" }}
          />
          <span
            title={farm.name}
            className={styles.farm_name}
          >
            {farm.name}
          </span>
        </div>
      </div>
    </div>

  );
};
