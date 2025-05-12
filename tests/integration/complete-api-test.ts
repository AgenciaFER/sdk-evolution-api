import { describeOrSkip } from './utils';
import { EvolutionAPI } from '../../src';
import WebSocket from 'ws';
import amqp from 'amqplib';
import express from 'express';
import http from 'http';

const API_URL = process.env.EVOLUTION_API_URL!;
const API_KEY = process.env.EVOLUTION_API_KEY!;
const INSTANCE_NAME = process.env.EVOLUTION_API_INSTANCE!;
const TEST_PHONE = process.env.TEST_PHONE!;
const WS_URL = process.env.EVOLUTION_API_WS_URL || API_URL.replace(/^http/, 'ws') + '/ws';

let api: EvolutionAPI;
beforeAll(() => {
  api = new EvolutionAPI({ baseUrl: API_URL, apiKey: API_KEY });
  api.instance.setInstance(INSTANCE_NAME);
  api.message.setInstance(INSTANCE_NAME);
  api.chat.setInstance(INSTANCE_NAME);
  api.group.setInstance(INSTANCE_NAME);
  api.profile.setInstance(INSTANCE_NAME);
  api.label.setInstance(INSTANCE_NAME);
  api.settings.setInstance(INSTANCE_NAME);
});

describe('Integration: Proxy API', () => {
  describeOrSkip('proxy.set', () => {
    it('should set proxy', async () => {
      // TODO: implement proxy.set test
    });
  });

  describeOrSkip('proxy.find', () => {
    it('should find proxy', async () => {
      // TODO: implement proxy.find test
    });
  });
});

describe('Integration: Settings API', () => {
  describeOrSkip('settings.set', () => {
    it('should set settings', async () => {
      // TODO: implement settings.set test
    });
  });

  describeOrSkip('settings.find', () => {
    it('should find settings', async () => {
      // TODO: implement settings.find test
    });
  });
});

describe('Integration: Call API', () => {
  describeOrSkip('call.fakeCall', () => {
    it('should perform fake call', async () => {
      // TODO: implement call.fakeCall test
    });
  });
});

describe('Integration: Chat Extended Features', () => {
  describeOrSkip('chat.archive', () => {
    it('should archive chat', async () => {
      // TODO: implement chat.archive test
    });
  });
  describeOrSkip('chat.markAsUnread', () => {
    it('should mark chat as unread', async () => {
      // TODO: implement chat.markAsUnread test
    });
  });
  describeOrSkip('chat.deleteMessage', () => {
    it('should delete a message', async () => {
      // TODO: implement chat.deleteMessage test
    });
  });
  // ...add other chat methods: profilePicture, presence, block/unblock, findContacts, findStatus
});

describe('Integration: Label API', () => {
  describeOrSkip('label.find', () => {
    it('should fetch labels', async () => {
      // TODO: implement label.find test
    });
  });
  describeOrSkip('label.handle', () => {
    it('should handle label', async () => {
      // TODO: implement label.handle test
    });
  });
});

describe('Integration: Profile Settings', () => {
  describeOrSkip('profile.updateName', () => {
    it('should update profile name', async () => {
      // TODO: implement profile.updateName test
    });
  });
  describeOrSkip('profile.updatePicture', () => {
    it('should update profile picture', async () => {
      // TODO: implement profile.updatePicture test
    });
  });
  // ...other profile settings: business profile, privacy
});

describe('Integration: Group API', () => {
  describeOrSkip('group.create', () => {
    it('should create a group', async () => {
      // TODO: implement group.create test
    });
  });
  describeOrSkip('group.fetchAll', () => {
    it('should fetch all groups', async () => {
      // TODO: implement group.fetchAll test
    });
  });
  describeOrSkip('group.inviteCode', () => {
    it('should fetch and revoke invite codes', async () => {
      // TODO: implement group.inviteCode tests
    });
  });
  // ...other group CRUD and participant operations
});

describe('Integration: Extensions & Integrations', () => {
  describeOrSkip('integrations.list', () => {
    it('should list integrations', async () => {
      // TODO: implement integrations.list test
    });
  });
  // ...other integration endpoints
});

describe('Integration: Events API', () => {
  describeOrSkip('events.find', () => {
    it('should list events via polling', async () => {
      await api.message.sendText(TEST_PHONE, '💡 test-event');
      const events = await api.events.find();
      expect(Array.isArray(events)).toBe(true);
      if (events.length > 0) {
        expect(events[0]).toHaveProperty('type');
      }
    });
  });
});

describe('Integration: WebSocket', () => {
  describeOrSkip('websocket connection', () => {
    it('connects and receives message event via WS', done => {
      const ws = new WebSocket(`${WS_URL}?token=${API_KEY}`);
      ws.on('open', () => {
        api.message.sendText(TEST_PHONE, '🚀 ws-test');
      });
      ws.on('message', data => {
        const msg = JSON.parse(data.toString());
        expect(msg).toHaveProperty('type', 'message');
        ws.close();
        done();
      });
    });
  });
});

describe('Integration: RabbitMQ', () => {
  describeOrSkip('rabbitmq consumer', () => {
    it('should consume message from RabbitMQ queue', async () => {
      const conn = await amqp.connect(process.env.RABBITMQ_URL!);
      const ch = await conn.createChannel();
      await ch.assertQueue(process.env.RABBITMQ_QUEUE!);
      const received = new Promise(resolve => {
        ch.consume(
          process.env.RABBITMQ_QUEUE!,
          msg => {
            if (msg) {
              const content = JSON.parse(msg.content.toString());
              expect(content).toHaveProperty('event');
              resolve(null);
            }
          },
          { noAck: true }
        );
      });
      await api.events.publish({ key: 'test' });
      await received;
      await ch.close();
      await conn.close();
    });
  });
});

describe('Integration: Webhook', () => {
  describeOrSkip('webhook receiver', () => {
    it('should receive webhook call', async () => {
      const app = express();
      app.use(express.json());
      const server = http.createServer(app);
      await new Promise(res => server.listen(3001, res));
      const received = new Promise(resolve => {
        app.post('/webhook', (req, res) => {
          expect(req.body).toHaveProperty('event');
          res.sendStatus(200);
          resolve(null);
        });
      });
      await api.webhook.register(process.env.WEBHOOK_TARGET_URL!);
      await api.message.sendText(TEST_PHONE, '🔔 webhook-test');
      await received;
      server.close();
    });
  });
});