
import { WebSocketServer, WebSocket } from 'ws';

const PORT = Number(process.env.PORT) || 8080;
const ROOM_NAME = 'operations-room';

// Temporary in-memory state for testing.
// Task IDs must match src/data/initialTasks.js.
const taskStatuses = new Map();

const server = new WebSocketServer({ port: PORT });

function broadcast(message) {
  const payload = JSON.stringify(message);

  for (const client of server.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}

server.on('connection', (socket) => {
  console.log('[WebSocket] Client connected');

  socket.send(JSON.stringify({
    type: 'STATE_SNAPSHOT',
    room: ROOM_NAME,
    statuses: Object.fromEntries(taskStatuses),
  }));

  socket.on('message', (buffer) => {
    let message;

    try {
      message = JSON.parse(buffer.toString());
    } catch {
      socket.send(JSON.stringify({
        type: 'ERROR',
        message: 'Invalid JSON payload',
      }));
      return;
    }

    if (message.type !== 'STATUS_UPDATE') return;

    const { taskId, newStatus } = message;
    const allowedStatuses = ['APPROVED', 'REJECTED'];

    if (
      !Number.isInteger(taskId) ||
      !allowedStatuses.includes(newStatus)
    ) {
      socket.send(JSON.stringify({
        type: 'ERROR',
        message: 'Invalid status update',
      }));
      return;
    }

    taskStatuses.set(taskId, newStatus);

    broadcast({
      type: 'STATUS_UPDATE',
      room: ROOM_NAME,
      taskId,
      newStatus,
      updatedAt: new Date().toISOString(),
    });

    console.log(`[WebSocket] Task ${taskId} → ${newStatus}`);
  });

  socket.on('close', () => {
    console.log('[WebSocket] Client disconnected');
  });

  socket.on('error', (error) => {
    console.error('[WebSocket] Client error:', error.message);
  });
});

server.on('listening', () => {
  console.log(`[WebSocket] Server listening on ws://localhost:${PORT}`);
});

server.on('error', (error) => {
  console.error('[WebSocket] Server error:', error.message);
});

