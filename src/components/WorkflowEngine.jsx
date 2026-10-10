
import { useCallback, useEffect, useRef, useState } from 'react';
import { initialTasks } from '../data/initialTasks.js';
<<<<<<< HEAD
import { SOCKET_URL, getBackoffDelay, parseStatusUpdate } from '../lib/socket.js';
=======
import { SOCKET_URL, getBackoffDelay, parseMessage } from '../lib/socket.js';
>>>>>>> bf73fd9 (Merge remote main with local project)
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Icon from './Icon.jsx';
import BoardColumn from './BoardColumn.jsx';

const COLUMNS = [
  { key: 'pending', title: 'Pending', icon: 'hourglass', statuses: ['PENDING'] },
  { key: 'in-progress', title: 'In Progress', icon: 'clock', statuses: ['IN_PROGRESS'] },
  { key: 'completed', title: 'Completed', icon: 'check', statuses: ['APPROVED', 'REJECTED'] },
];

export default function WorkflowEngine() {
  const [tasks, setTasks] = useState(initialTasks);
  const [connection, setConnection] = useState('connecting');
  const [retryInSeconds, setRetryInSeconds] = useState(null);
  const socketRef = useRef(null);

<<<<<<< HEAD
  useEffect(() => {
    let socket = null;
    let retryTimer = null;
    let attempt = 0;
    let isUnmounted = false;

    function scheduleReconnect() {
      const delay = getBackoffDelay(attempt);
      attempt += 1;
      setConnection('reconnecting');
      setRetryInSeconds(delay / 1000);
      retryTimer = setTimeout(connect, delay);
    }

    function connect() {
      socket = new WebSocket(SOCKET_URL);
      socketRef.current = socket;

      socket.onopen = () => {
        attempt = 0;
        setConnection('open');
        setRetryInSeconds(null);
      };

      socket.onmessage = (event) => {
        const update = parseStatusUpdate(event.data);
        if (!update) return;

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === update.taskId ? { ...task, status: update.newStatus } : task,
          ),
        );
        console.log('[Analytics] Task status mutated via WebSocket', update);
      };

      socket.onerror = () => {
        socket.close();
      };

      socket.onclose = () => {
        socketRef.current = null;
        if (!isUnmounted) scheduleReconnect();
      };
    }

    connect();

    return () => {
      isUnmounted = true;
      clearTimeout(retryTimer);
      if (socket) {
        socket.onclose = null;
        socket.close();
      }
      socketRef.current = null;
    };
  }, []);

  const isOnline = connection === 'open';

  const sendStatusUpdate = useCallback((taskId, newStatus) => {
    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    socket.send(JSON.stringify({ type: 'STATUS_UPDATE', taskId, newStatus }));
  }, []);
=======

useEffect(() => {
  let socket = null;
  let retryTimer = null;
  let attempt = 0;
  let isUnmounted = false;

  function scheduleReconnect() {
    if (isUnmounted) return;

    const delay = getBackoffDelay(attempt);
    attempt += 1;

    setConnection('reconnecting');
    setRetryInSeconds(Math.ceil(delay / 1000));

    retryTimer = setTimeout(connect, delay);
  }


function connect() {
  if (isUnmounted) return;

  setConnection((current) =>
    current === 'connecting' ? 'connecting' : 'reconnecting'
  );

  try {
    const currentSocket = new WebSocket(SOCKET_URL);

    socket = currentSocket;
    socketRef.current = currentSocket;

    currentSocket.onopen = () => {
      if (isUnmounted) {
        currentSocket.close();
        return;
      }

      // Reset retry attempts after a successful connection.
      attempt = 0;

      setConnection('open');
      setRetryInSeconds(null);
    };

    currentSocket.onmessage = (event) => {
      if (
        isUnmounted ||
        socketRef.current !== currentSocket
      ) {
        return;
      }

      const message = parseMessage(event.data);
      if (!message) return;

      if (message.type === 'STATE_SNAPSHOT') {
        setTasks((previousTasks) =>
          previousTasks.map((task) => ({
            ...task,
            status:
              message.statuses?.[task.id] ?? task.status,
          }))
        );
        return;
      }

      if (message.type === 'ERROR') {
        console.error(
          '[WebSocket] Server error:',
          message.message
        );
        return;
      }

      if (message.type === 'STATUS_UPDATE') {
        if (
          !Number.isInteger(message.taskId) ||
          !['APPROVED', 'REJECTED'].includes(message.newStatus)
        ) {
          return;
        }

        console.log(
          '[Analytics] Task status mutated via WebSocket',
          message
        );

        setTasks((previousTasks) =>
          previousTasks.map((task) =>
            task.id === message.taskId
              ? { ...task, status: message.newStatus }
              : task
          )
        );
      }
    };

    currentSocket.onerror = () => {
      // onclose will schedule the reconnection.
      if (currentSocket.readyState !== WebSocket.CLOSED) {
        currentSocket.close();
      }
    };

    currentSocket.onclose = () => {
      // Ignore events from old connections.
      if (socketRef.current !== currentSocket) {
        return;
      }

      socketRef.current = null;
      socket = null;

      if (!isUnmounted) {
        scheduleReconnect();
      }
    };
  } catch (error) {
    console.error('[WebSocket] Connection failed:', error);
    scheduleReconnect();
  }
}


  connect();

  return () => {
    isUnmounted = true;
    clearTimeout(retryTimer);

    if (socket) {
      socket.onopen = null;
      socket.onmessage = null;
      socket.onerror = null;
      socket.onclose = null;
      socket.close();
    }

    socketRef.current = null;
  };
}, []);


  const isOnline = connection === 'open';

const sendStatusUpdate = useCallback((taskId, newStatus) => {
  const socket = socketRef.current;

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return;
  }

  socket.send(
    JSON.stringify({
      type: 'STATUS_UPDATE',
      taskId,
      newStatus,
    })
  );
}, []);
>>>>>>> bf73fd9 (Merge remote main with local project)

  const allDone = tasks.every(
    (task) => task.status === 'APPROVED' || task.status === 'REJECTED',
  );

  return (
    <div className="app">
      <Header connection={connection} retryInSeconds={retryInSeconds} />

      <div className="app__body">
        <Sidebar connection={connection} />

        <main className="main">
          <div className="intro">
            <div>
              <h2 className="intro__title">Welcome back, Nandini</h2>
              <p className="intro__text">
                Manage and verify tickets in real-time. Your actions are instantly synced across all
                operators.
              </p>
            </div>
            <div className="live-card">
              <Icon name="broadcast" size={24} className="live-card__icon" />
              <div>
                <p className="live-card__title">Live Updates</p>
                <p className="live-card__text">Changes are broadcasted instantly</p>
              </div>
            </div>
          </div>

          {connection === 'connecting' ? (
            <div className="loading" role="status">
              <span className="spinner" aria-hidden="true" />
              <p>Connecting to the operations room…</p>
            </div>
          ) : (
            <div className="board">
              {COLUMNS.map((column) => (
                <BoardColumn
                  key={column.key}
                  id={column.key}
                  title={column.title}
                  icon={column.icon}
                  tasks={tasks.filter((task) => column.statuses.includes(task.status))}
                  isOnline={isOnline}
                  onAction={sendStatusUpdate}
                  showEmptyState={column.key === 'completed' && allDone}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
