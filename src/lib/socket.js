// wss://echo.websocket.events has been shut down; echo.websocket.org is the same service at its current address.
export const SOCKET_URL = 'wss://echo.websocket.org';

const BASE_DELAY_MS = 1000;
const MAX_DELAY_MS = 30000;

const ALLOWED_STATUSES = ['PENDING', 'IN_PROGRESS', 'APPROVED', 'REJECTED'];

// 1s, 2s, 4s, 8s ... capped at 30s
export function getBackoffDelay(attempt) {
  return Math.min(BASE_DELAY_MS * 2 ** attempt, MAX_DELAY_MS);
}

// Only accept well-formed STATUS_UPDATE messages; the echo server also sends plain-text greetings.
export function parseStatusUpdate(raw) {
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }

  if (
    data?.type !== 'STATUS_UPDATE' ||
    !Number.isInteger(data.taskId) ||
    !ALLOWED_STATUSES.includes(data.newStatus)
  ) {
    return null;
  }

  return { taskId: data.taskId, newStatus: data.newStatus };
}
