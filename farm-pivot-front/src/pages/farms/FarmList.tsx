import { useEffect, useState } from "react";
import { io } from 'socket.io-client';

import { FarmCard } from "../../components/FarmCard";
import { Datagrid, type Column } from "../../components/Datagrid";
import { Modal } from "../../components/Modal";
import { ModalForm, type FormField } from "../../components/ModalForm";

import { GiFarmTractor } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";

import styles from "./FarmList.module.css";

interface Pivot {
  id: number;
  name: string;
  status: string;
  direction: string;
  speed: number;
  pressure: number;
}

interface Farm {
  id: number;
  name: string;
  userId: number;
  pivots: Pivot[];
}

interface User {
  id: number;
  name: string;
}

interface Update {
  pivotId: number;
  status: string;
}


export const FarmList = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null);
  const [pivotStatus, setPivotStatus] = useState<Record<number, string>>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isPivotModalOpen, setIsPivotModalOpen] = useState(false);
  const [selectedPivot, setSelectedPivot] = useState<Pivot | null>(null);
  const [pivotFormData, setPivotFormData] = useState({
    direction: "",
    speed: 0,
    pressure: 0,
  });

  const [isPivotCreateModalOpen, setIsPivotCreateModalOpen] = useState(false);

  const pivotFormFields: FormField[] = [
    { name: "name", label: "Nome", type: "text", required: true },
    { name: "direction", label: "Direção", type: "text", required: true },
    { name: "speed", label: "Velocidade", type: "number", required: true },
    { name: "pressure", label: "Pressão", type: "number", required: true },
    { name: "status", label: "Status", type: "text", required: false },
  ];

  const formFields: FormField[] = [
    { name: "name", label: "Nome da Fazenda", type: "text", required: true },
    { name: "userId", label: "Usuário", type: "select", required: true, options: users.map(user => ({ value: user.id.toString(), label: user.name })), },
  ];

  const selectedFarm = farms.find(farm => farm.id === selectedFarmId) ?? null;

  useEffect(() => {
    fetch("http://localhost:3000/farms")
      .then(res => res.json())
      .then((data: Farm[]) => setFarms(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:3001', {
      transports: ['websocket'], // força usar websocket
    });

    socket.on('connect', () => {
      console.log('Conectado ao Socket.IO');
    });

    socket.on('statusUpdate', (updates: Update[]) => {
      setPivotStatus((prev) => {
        const next = { ...prev };
        updates.forEach(({ pivotId, status }: Update) => {
          next[pivotId] = status;
        });
        return next;
      });

      setFarms((prevFarms) => {
        return prevFarms.map(farm => {
          const updatedPivots = farm.pivots.map(pivot => {
            const update = updates.find((u: Update) => u.pivotId === pivot.id);
            return update ? { ...pivot, status: update.status } : pivot;
          });
          return { ...farm, pivots: updatedPivots };
        });
      });
    });

    socket.on('disconnect', () => {
      console.log('Desconectado do Socket.IO');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const columns: Column<Pivot>[] = [
    { key: "name", label: "Nome" },
    {
      key: "status",
      label: "Status",
      render: (_, row) => {
        const status = pivotStatus[row.id] || row.status;
        return (
          <span
            className={`${styles.status} ${status === "ligado" ? styles.statusOn : styles.statusOff}`}
          >
            {status}
          </span>
        );
      }
    },
    { key: "direction", label: "Direção" },
    { key: "speed", label: "Velocidade" },
    { key: "pressure", label: "Pressão" },
    {
      key: "actions",
      label: "Ações",
      render: (_, row) => {
        const currentStatus = pivotStatus[row.id] || row.status;
        const isLigado = currentStatus === "ligado";

        return (
          <button
            className={`${isLigado ? styles.desligado : styles.ligado}`}
            onClick={() => handleTogglePivot(row)}
          >
            {isLigado ? "Desligar" : "Ligar"}
          </button>
        );
      }
    }
  ];

  const handleCreateFarm = async (data: { name: string; userId: string }) => {
    const user = users.find(u => u.id === Number(data.userId));
    if (!user) {
      alert("Usuário não encontrado");
      return;
    }

    const res = await fetch("http://localhost:3000/farms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        userId: user.id,
      }),
    });
    if (!res.ok) throw new Error("Erro ao criar fazenda");
    const newFarm: Farm = await res.json();
    if (!newFarm.pivots) newFarm.pivots = [];
    setFarms((prev) => [...prev, newFarm]);
    setIsCreateModalOpen(false);
  };

  const handleCreatePivot = async (data: {
    name: string;
    direction: string;
    speed: string;
    pressure: string;
    status?: string;
  }) => {
    if (!selectedFarm) return;

    try {
      const res = await fetch(`http://localhost:3000/pivots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          direction: data.direction,
          speed: Number(data.speed),
          pressure: Number(data.pressure),
          status: data.status || "desligado",
          farmId: selectedFarm?.id,
        }),
      });
      if (!res.ok) throw new Error("Erro ao criar pivô");
      const createdPivot: Pivot = await res.json();

      setFarms((prevFarms) =>
        prevFarms.map((farm) =>
          farm.id === selectedFarm.id
            ? { ...farm, pivots: [...farm.pivots, createdPivot] }
            : farm
        )
      );

      setIsPivotCreateModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Falha ao criar pivô.");
    }
  };

  const handleTogglePivot = (pivot: Pivot) => {
    const isLigado = (pivotStatus[pivot.id] || pivot.status) === "ligado";

    if (isLigado) {
      fetch(`http://localhost:3000/pivots/${pivot.id}/off`, {
        method: "PUT",
      })
        .then(() => {
          setFarms(prevFarms =>
            prevFarms.map(farm => ({
              ...farm,
              pivots: farm.pivots.map(p =>
                p.id === pivot.id ? { ...p, status: "desligado" } : p
              ),
            }))
          );
          setPivotStatus(prev => ({ ...prev, [pivot.id]: "desligado" }));
        })
        .catch(err => console.error("Erro ao desligar:", err));
    } else {
      setSelectedPivot(pivot);
      setPivotFormData({
        direction: pivot.direction,
        speed: pivot.speed,
        pressure: pivot.pressure,
      });
      setIsPivotModalOpen(true);
    }
  };

  const handleConfirmPivotOn = () => {
    if (!selectedPivot) return;

    fetch(`http://localhost:3000/pivots/${selectedPivot.id}/on`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pivotFormData),
    })
      .then(() => {
        setIsPivotModalOpen(false);
        setFarms(prevFarms =>
          prevFarms.map(farm => ({
            ...farm,
            pivots: farm.pivots.map(p =>
              p.id === selectedPivot.id
                ? {
                  ...p,
                  status: "ligado",
                  direction: pivotFormData.direction,
                  speed: pivotFormData.speed,
                  pressure: pivotFormData.pressure,
                }
                : p
            ),
          }))
        );
        setPivotStatus(prev => ({ ...prev, [selectedPivot.id]: "ligado" }));
      })
      .catch(err => console.error("Erro ao ligar:", err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <GiFarmTractor style={{ marginRight: "8px", verticalAlign: "middle" }} />
          Fazendas
        </h2>
      </div>

      <div className={styles.farm_cards}>
        {farms.map((farm) => (
          <FarmCard
            key={farm.id}
            farm={{
              ...farm,
              hasActivePivot: farm.pivots?.some(
                (p) => (pivotStatus[p.id] || p.status) === "ligado"
              ) ?? false,
            }}
            onClick={() => setSelectedFarmId(farm.id)}
          />
        ))}
        <button
          className={styles.createButton}
          onClick={() => setIsCreateModalOpen(true)}
        >
          <FaPlus size={10} />
          Nova Fazenda
        </button>
      </div>

      <Modal
        isOpen={!!selectedFarm}
        onClose={() => setSelectedFarmId(null)}
        title={selectedFarm?.name || ""}
      >
        {selectedFarm && (
          <>
            <button
              onClick={() => setIsPivotCreateModalOpen(true)}
              className={styles.createPivot}
            >
              + Novo Pivô
            </button>

            <Datagrid
              columns={columns}
              data={(selectedFarm.pivots ?? []).map(p => ({
                ...p,
                status: pivotStatus[p.id] || p.status,
              }))}
              rowKey="id"
            />
          </>
        )}
      </Modal>

      <ModalForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Criar Nova Fazenda"
        formFields={formFields}
        onSubmit={handleCreateFarm}
      />

      <ModalForm
        isOpen={isPivotCreateModalOpen}
        onClose={() => setIsPivotCreateModalOpen(false)}
        title="Criar Novo Pivô"
        formFields={pivotFormFields}
        onSubmit={handleCreatePivot}
      />

      <Modal
        isOpen={isPivotModalOpen}
        onClose={() => setIsPivotModalOpen(false)}
        title="Ligar Pivô"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirmPivotOn();
          }}
        >
          <label>
            Direção:
            <input
              type="text"
              value={pivotFormData.direction}
              onChange={(e) =>
                setPivotFormData({ ...pivotFormData, direction: e.target.value })
              }
              required
            />
          </label>
          <label>
            Velocidade:
            <input
              type="number"
              value={pivotFormData.speed}
              onChange={(e) =>
                setPivotFormData({ ...pivotFormData, speed: Number(e.target.value) })
              }
              required
            />
          </label>
          <label>
            Pressão:
            <input
              type="number"
              value={pivotFormData.pressure}
              onChange={(e) =>
                setPivotFormData({ ...pivotFormData, pressure: Number(e.target.value) })
              }
              required
            />
          </label>

          <div className={styles.confirm}>
            <button type="submit">Confirmar</button>
            <button
              type="button"
              onClick={() => setIsPivotModalOpen(false)}
              className={styles.cancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
