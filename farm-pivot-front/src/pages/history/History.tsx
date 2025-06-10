import { useEffect, useState } from "react";
import { FarmCard } from "../../components/FarmCard";
import { Datagrid, type Column } from "../../components/Datagrid";
import { Modal } from "../../components/Modal";
import { FiClock } from 'react-icons/fi';
import styles from "./History.module.css";

interface Pivot {
  id: number;
  name: string;
  farmId: number;
}

interface Farm {
  id: number;
  name: string;
  userId: number;
  pivots: Pivot[]; 
}

interface PivotEvent {
  id: number;
  status: "ligado" | "desligado";
  direction: string;
  speed: number;
  pressure: number;
  timestamp: string;
  pivotId: number;
}

interface PivotHistoryPeriod {
  id: string;
  pivotId: number;
  pivotName: string;
  ligadoEm: string;
  desligadoEm: string | null;
  duracaoSegundos: number;
  direction: string;
  speed: number;
  pressure: number;
}

interface FarmHistory {
  id: number;
  name: string;
  userId: number;
  pivotHistories: PivotHistoryPeriod[];
}

export function History() {
  const [farmHistories, setFarmHistories] = useState<FarmHistory[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<FarmHistory | null>(null);

  useEffect(() => {
    const fetchFarmsWithHistory = async () => {
      const farmsRes = await fetch("http://localhost:3000/farms");
      const fetchedFarms: Farm[] = await farmsRes.json();

      const pivotMap = new Map<number, Pivot>();
      const farmMap = new Map<number, Farm>();
      fetchedFarms.forEach(farm => {
        farmMap.set(farm.id, farm);
        farm.pivots.forEach(pivot => {
          pivotMap.set(pivot.id, { ...pivot, farmId: farm.id });
        });
      });


      const pivotPeriods: PivotHistoryPeriod[] = [];

      for (const [pivotId, pivot] of pivotMap.entries()) {
        try {
          const res = await fetch(`http://localhost:3000/status-history/${pivotId}`);
          const events: PivotEvent[] = await res.json();

          events.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

          for (let i = 0; i < events.length; i++) {
            const ev = events[i];
            if (ev.status === "ligado") {
              let desligadoEm: string | null = null;
              for (let j = i + 1; j < events.length; j++) {
                if (events[j].status === "desligado") {
                  desligadoEm = events[j].timestamp;
                  break;
                }
              }

              const ligadoDate = new Date(ev.timestamp);
              const desligadoDate = desligadoEm ? new Date(desligadoEm) : new Date();
              const duracaoSegundos = Math.floor((desligadoDate.getTime() - ligadoDate.getTime()) / 1000);

              pivotPeriods.push({
                id: `${pivotId}-${ev.timestamp}`,
                pivotId,
                pivotName: pivot.name,
                ligadoEm: ev.timestamp,
                desligadoEm,
                duracaoSegundos,
                direction: ev.direction,
                speed: ev.speed,
                pressure: ev.pressure,
              });
            }
          }
        } catch (error) {
          console.error(`Erro ao buscar histórico do pivô ${pivotId}`, error);
        }
      }

      const farmHistoryMap: Record<number, FarmHistory> = {};
      pivotPeriods.forEach(p => {
        const pivot = pivotMap.get(p.pivotId);
        if (!pivot) return;

        const farm = farmMap.get(pivot.farmId);
        if (!farm) return;

        if (!farmHistoryMap[farm.id]) {
          farmHistoryMap[farm.id] = {
            id: farm.id,
            name: farm.name,
            userId: farm.userId,
            pivotHistories: [],
          };
        }

        farmHistoryMap[farm.id].pivotHistories.push(p);
      });

      setFarmHistories(Object.values(farmHistoryMap));
    };

    fetchFarmsWithHistory();
  }, []);

  const columns: Column<PivotHistoryPeriod>[] = [
    { key: "pivotName", label: "Nome do Pivô" },
    {
      key: "ligadoEm",
      label: "Ligado Em",
      render: (value: string | number | null) => {
        if (!value) return "-";
        return new Date(value).toLocaleString();
      },
    },
    {
      key: "desligadoEm",
      label: "Desligado Em",
      render: (value: string | number | null) => {
        if (!value) return "Ainda ligado";
        return new Date(value).toLocaleString();
      },
    },
    {
      key: "duracaoSegundos",
      label: "Tempo Ligado",
      render: (v: string | number | null) => {
        if (typeof v !== "number" || isNaN(v)) return "-";

        const h = Math.floor(v / 3600);
        const m = Math.floor((v % 3600) / 60);
        const s = Math.floor(v % 60);

        return `${h}h ${m}m ${s}s`;
      }
    },
    { key: "direction", label: "Direção" },
    { key: "speed", label: "Velocidade" },
    { key: "pressure", label: "Pressão" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <FiClock style={{ marginRight: "8px", verticalAlign: "middle" }} />
          Histórico de Pivôs
        </h2>
      </div>

      <div className={styles.farm_cards}>
        {farmHistories.map(farm => (
          <FarmCard
            key={farm.id}
            farm={{
              id: farm.id,
              name: farm.name,
              userId: farm.userId,
              hasActivePivot: farm.pivotHistories.some(p => p.desligadoEm === null),
            }}
            onClick={() => setSelectedFarm(farm)}
          />
        ))}
      </div>

      <Modal
        isOpen={!!selectedFarm}
        onClose={() => setSelectedFarm(null)}
        title={selectedFarm?.name || ""}
        maxWidth="900px"
      >
        {selectedFarm && (
          <Datagrid
            columns={columns}
            data={selectedFarm.pivotHistories}
            rowKey="id"
          />
        )}
      </Modal>
    </div>
  );
}
