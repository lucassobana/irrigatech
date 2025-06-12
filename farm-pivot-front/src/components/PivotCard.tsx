import React from 'react';

type Props = {
  deviceId: string;
  status: string;
  onToggle: () => void;
};

const PivotCard: React.FC<Props> = ({ deviceId, status, onToggle }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8, marginBottom: 12 }}>
      <h3>Dispositivo: {deviceId}</h3>
      <p>Status atual: <strong>{status}</strong></p>
      <button onClick={onToggle}>
        {status === 'ligado' ? 'Desligar' : 'Ligar'}
      </button>
    </div>
  );
};

export default PivotCard;
