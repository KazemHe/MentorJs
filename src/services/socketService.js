import { useEffect, useRef } from 'react';
import { serverUrl } from '../services/http.service.js';
import  {io}  from 'socket.io-client';

export function useSocket(codeBlockId, setCodeBlock, setIsMentor,setEditedCode) {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(serverUrl);

    socketRef.current.on('connect', () => {
      socketRef.current.emit('join room', codeBlockId);
    });

    socketRef.current.on('is mentor', (isMentor) => {
      setIsMentor(isMentor);
    });

    socketRef.current.on('other code editing', (updatedCodeBlock) => {
      if (updatedCodeBlock._id === codeBlockId) {
        setEditedCode(updatedCodeBlock.code)
      }
    });

    return () => {
      socketRef.current.emit('leave room', codeBlockId);
      socketRef.current.disconnect();
      console.log('disconnected')
    };
  }, [codeBlockId, setCodeBlock, setIsMentor,setEditedCode]);

  return socketRef.current;
}
