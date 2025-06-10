import styles from './Home.module.css';

import pivoCentral from '../assets/pivo-central.jpg'

export function Home() {
  return (
    <div className={styles.container}>
      <img
        src={pivoCentral}
        alt="Pivô central de irrigação"
        className={styles.backgroundImage}
      />
      <div className={styles.overlay} />
      <div className={styles.frontContent}>
        <h1>
          Simplifique a <span className={styles.highlight}>irrigação</span> e colha melhores resultados!
        </h1>
        <p>
          Automatize a irrigação com eficiência e economia. Sensores <br />
          analisam o solo e o clima para usar apenas a água necessária. <br />
          Sustentabilidade e praticidade ao seu alcance.
        </p>
      </div>
    </div>
  );
};
