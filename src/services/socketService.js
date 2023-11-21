import { useEffect, useRef } from 'react';
import { serverUrl } from '../services/http.service.js';
import  {io}  from 'socket.io-client';

export function useSocket(codeBlockId, setCodeBlock, setIsMentor) {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(serverUrl);

    socketRef.current.on('connect', () => {
      socketRef.current.emit('join room', codeBlockId);
    });

    socketRef.current.on('is mentor', (isMentor) => {
      setIsMentor(isMentor);
    });

    socketRef.current.on('code editing', (updatedCodeBlock) => {
      if (updatedCodeBlock._id === codeBlockId) {
        setCodeBlock(updatedCodeBlock);
      }
    });

    return () => {
      socketRef.current.emit('leave room', codeBlockId);
      socketRef.current.disconnect();
    };
  }, [codeBlockId, setCodeBlock, setIsMentor]);

  return socketRef.current;
}
