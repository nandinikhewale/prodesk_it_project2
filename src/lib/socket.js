<<<<<<< HEAD
// wss://echo.websocket.events has been shut down; echo.websocket.org is the same service at its current address.
export const SOCKET_URL = 'wss://echo.websocket.org';
=======
export const SOCKET_URL =
  typeof window !== 'undefined' &&
  window.location.protocol === 'https:'
    ? 'wss://localhost:8080'
    : 'ws://localhost:8080';



export const ALLOWED_STATUSES = [
  'PENDING',
  'IN_PROGRESS',
  'APPROVED',
  'REJECTED',
];
>>>>>>> bf73fd9 (Merge remote main with local project)

const BASE_DELAY_MS = 1000;
const MAX_DELAY_MS = 30000;

<<<<<<< HEAD
const ALLOWED_STATUSES = ['PENDING', 'IN_PROGRESS', 'APPROVED', 'REJECTED'];

// 1s, 2s, 4s, 8s ... capped at 30s
=======
>>>>>>> bf73fd9 (Merge remote main with local project)
export function getBackoffDelay(attempt) {
  return Math.min(BASE_DELAY_MS * 2 ** attempt, MAX_DELAY_MS);
}

<<<<<<< HEAD
// Only accept well-formed STATUS_UPDATE messages; the echo server also sends plain-text greetings.
export function parseStatusUpdate(raw) {
  let data;
=======
export function parseMessage(raw) {
  let data;

>>>>>>> bf73fd9 (Merge remote main with local project)
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }

<<<<<<< HEAD
=======
  if (data?.type === 'STATE_SNAPSHOT') {
    if (
      !data.statuses ||
      typeof data.statuses !== 'object' ||
      Array.isArray(data.statuses)
    ) {
      return null;
    }

    const statuses = {};

    for (const [id, status] of Object.entries(data.statuses)) {
      const taskId = Number(id);

      if (
        !Number.isInteger(taskId) ||
        !ALLOWED_STATUSES.includes(status)
      ) {
        return null;
      }

      statuses[taskId] = status;
    }

    return { type: 'STATE_SNAPSHOT', statuses };
  }

  if (data?.type === 'ERROR') {
    return {
      type: 'ERROR',
      message:
        typeof data.message === 'string'
          ? data.message
          : 'The server rejected the request.',
    };
  }

>>>>>>> bf73fd9 (Merge remote main with local project)
  if (
    data?.type !== 'STATUS_UPDATE' ||
    !Number.isInteger(data.taskId) ||
    !ALLOWED_STATUSES.includes(data.newStatus)
  ) {
    return null;
  }

<<<<<<< HEAD
  return { taskId: data.taskId, newStatus: data.newStatus };
=======
  return {
    type: 'STATUS_UPDATE',
    taskId: data.taskId,
    newStatus: data.newStatus,
  };
>>>>>>> bf73fd9 (Merge remote main with local project)
}
