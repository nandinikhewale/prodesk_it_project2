const configuredSocketUrl =
  typeof process !== 'undefined' && process.env
    ? process.env.VITE_SOCKET_URL
    : undefined;

export const SOCKET_URL =
  configuredSocketUrl ||
  (typeof window !== 'undefined' &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname)
    ? window.location.protocol === 'https:'
      ? 'wss://localhost:8080'
      : 'ws://localhost:8080'
    : 'wss://echo.websocket.org');

export const ALLOWED_STATUSES = ['PENDING', 'IN_PROGRESS', 'APPROVED', 'REJECTED'];

const BASE_DELAY_MS = 1000;
const MAX_DELAY_MS = 30000;


export function getBackoffDelay(attempt) {
  return Math.min(BASE_DELAY_MS * 2 ** attempt, MAX_DELAY_MS);
}

export function parseMessage(raw) {
  let data;

  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }

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

      if (!Number.isInteger(taskId) || !ALLOWED_STATUSES.includes(status)) {
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

  // Only accept well-formed STATUS_UPDATE messages; the echo server also sends plain-text greetings.
  if (
    data?.type !== 'STATUS_UPDATE' ||
    !Number.isInteger(data.taskId) ||
    !ALLOWED_STATUSES.includes(data.newStatus)
  ) {
    return null;
  }

  return {
    type: 'STATUS_UPDATE',
    taskId: data.taskId,
    newStatus: data.newStatus,
  };
}

export function parseStatusUpdate(raw) {
  return parseMessage(raw);
}
