import { useEffect, useRef } from 'react';
import { serverUrl } from '../services/http.service.js';
import  {io}  from 'socket.io-client';

export function useSocket(codeBlockId, setCodeBlock, setIsMentor,setEditedCode) {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(serverUrl);

    socketRef.current.on('connect', () => {
        console.log('onnected')
      socketRef.current.emit('join room', codeBlockId);
    });

    socketRef.current.on('is mentor', (isMentor) => {
        console.log('recive is mentor')
      setIsMentor(isMentor);
    });

    socketRef.current.on('other code editing', (updatedCodeBlock) => {
        console.log('outside the if',updatedCodeBlock)
      if (updatedCodeBlock._id === codeBlockId) {
        console.log('inside the if')
        setEditedCode(updatedCodeBlock.code)
      }
    });

    return () => {
      socketRef.current.emit('leave room', codeBlockId);
      console.log('disconnected')
      socketRef.current.disconnect();
    };
  }, [codeBlockId, setCodeBlock, setIsMentor,setEditedCode]);

  return socketRef.current;
}
