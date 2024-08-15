import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField, Box } from '@mui/material';
import Peer from 'peerjs';

const Host = () => {
  const [peerId, setPeerId] = useState('');
  const [connections, setConnections] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [peer, setPeer] = useState(null);

  useEffect(() => {
    const newPeer = new Peer();
    newPeer.on('open', (id) => {
      setPeerId(id);
    });

    newPeer.on('connection', (conn) => {
        conn.on('open', () => {
            const nickname = conn.metadata.nickname
            setConnections((prev) => [...prev, conn]);
            setMessages((prev) => [...prev, `${nickname} 연결성공!`]);
            console.log(nickname)
            conn.on('data', (data) => {
              setMessages((prev) => [...prev, `${nickname}: ${data}`]);
        })
      });
    });

    setPeer(newPeer);
    return () => newPeer.destroy();
  }, []);

  const sendMessage = () => {
    connections.forEach((conn) => {
      conn.send(inputMessage);
    });
    setMessages((prev) => [...prev, `Host: ${inputMessage}`]);
    setInputMessage('');
  };

  return (
    <Box sx={{ p: 3 , color:'black'}}>
      <Typography variant="h4">방 호스트</Typography>
      <Typography>코드: <strong>{peerId}</strong></Typography>

      <Box sx={{ mt: 2 }}>
        {messages.map((msg, index) => (
          <Typography key={index}>{msg}</Typography>
        ))}
      </Box>

      <TextField
        label="메시지 입력"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        onClick={sendMessage}
        sx={{ mt: 2 }}
        disabled={!inputMessage}
      >
        보내기
      </Button>
    </Box>
  );
};

export default Host;
