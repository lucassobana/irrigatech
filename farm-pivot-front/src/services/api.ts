import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Porta da API NestJS HTTP
});

export const sendCommand = (deviceId: string, command: 'ligado' | 'desligado') => {
  return api.post('/equipment/command', { deviceId, command });
};
