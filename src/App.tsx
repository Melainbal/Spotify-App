import './App.css';
import { useState } from 'react';
import { Game } from './screens';
import { GameOver } from './screens/GameOver';
import { Box, CssBaseline } from '@mui/material';


function App() {
  const [gameScore, setGameScore] = useState<number | undefined>(undefined)

  const onGameOver = (score: number) => {
    setGameScore(score);
  }

  return (
    <Box
        sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage: 'linear-gradient(to right, #1f4037, #99f2c8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <CssBaseline />
        {
            gameScore === undefined
            ? <Game onGameOver={onGameOver} />
            : <GameOver score={gameScore} />
        }
    </Box>
  );
}

export default App;