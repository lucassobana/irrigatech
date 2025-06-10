import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;

  onModuleInit() {
    this.client = mqtt.connect('wss://<endpoint>.iot.<region>.amazonaws.com/mqtt', {
      clientId: 'backend-service',
      protocol: 'wss',
      username: 'unused',
      password: '<jwt/certificate if needed>',
    });

    this.client.on('connect', () => {
      console.log('Connected to AWS IoT');
      this.client.subscribe('pivots/+/status');
    });

    this.client.on('message', (topic, message) => {
      const [_, pivotId, type] = topic.split('/');
      const payload = JSON.parse(message.toString());

      if (type === 'status') {
        // Atualiza no banco e notifica via WebSocket
      }
    });
  }

  sendCommandToPivot(pivotId: string, command: any) {
    this.client.publish(`pivots/${pivotId}/command`, JSON.stringify(command));
  }
}
