import React, { useState } from 'react';
import { Button, Typography, TextField, Box } from '@mui/material';
import Peer from 'peerjs';

const Client = () => {
  const [peer, setPeer] = useState(null);
  const [connection, setConnection] = useState(null);
  const [hostId, setHostId] = useState('');
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const connectToHost = () => {
    const newPeer = new Peer();
    const conn = newPeer.connect(hostId, {
        metadata: {nickname}
    });

    conn.on('open', () => {
      setConnection(conn);
      setIsConnected(true)
    });

    conn.on('data', (data) => {
      setMessages((prev) => [...prev, `Host: ${data}`]);
    });

    setPeer(newPeer);
  };

  const sendMessage = () => {
    if (connection) {
      connection.send(inputMessage);
      setMessages((prev) => [...prev, `You: ${inputMessage}`]);
      setInputMessage('');
    }
  };

  return (
    <Box sx={{ p: 3, color:'black'}}>
      <Typography variant="h4">코드로 방 참가하기</Typography>
      
      <TextField
        label="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />
      <TextField
        label="코드"
        value={hostId}
        onChange={(e) => setHostId(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        onClick={connectToHost}
        sx={{ mt: 2 }}
        disabled={!hostId || !nickname}
      >
        연결
      </Button>

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
        disabled={!inputMessage || !isConnected}
      >
        보내기
      </Button>
    </Box>
  );
};

export default Client;
