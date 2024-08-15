import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import Host from './Host';
import Client from './Client';

function App() {
  const [role, setRole] = useState(null);

  return (
    <Box sx={{ p: 3 }}>
      {!role && (
        <Box>
          <Button variant="contained" onClick={() => setRole('host')} sx={{ mr: 2 }}>
            방 만들기
          </Button>
          <Button variant="contained" onClick={() => setRole('client')}>
            방 참가하기
          </Button>
        </Box>
      )}
      {role === 'host' && <Host />}
      {role === 'client' && <Client />}
    </Box>
  );
}

export default App;
