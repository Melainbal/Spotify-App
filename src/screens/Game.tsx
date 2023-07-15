import { Box, Stack, Typography } from "@mui/material"
import { GameRound } from "./GameRound"
import { useState, useEffect } from "react"
import { fetchArtistId } from "../api"
import { green } from '@mui/material/colors'


const predefineArtistFullNames = [
    'Harry Styles',
    'Beyonce',
    'Green Day',
    'Twenty One Pilots',
    'The Neighbourhood',
    'Tuna',
    'Rihanna',
    'Miley Cyrus',
    'Whitney Houston',
    'Drake',
    'Linkin Park',
    'Sam Smith',
    'Gun`s and roses',
    'Nirvana',
    'System Of A Down',
    'Fall Out Boy',
    'Adele',
    'Lady Gaga',
    'Arctic Monkeys',
    'Panic! At The Disco',
];

export type GameProps = {
    onGameOver: (score: number) => void
}

const _maxRoundCount = 5;

export const Game = ({ onGameOver }: GameProps) => {
    const [usedArtists, setUsedArtists] = useState<string[]>([])
    const [totalScore, setTotalScore] = useState(0)
    const [roundCount, setRoundCount] = useState(1)
    const [artistName, setArtistName] = useState('')
    const [artistId, setArtistId] = useState(undefined)

    useEffect(
        () => {
            setNewRound();
        },
        [])

    const setNewRound = () => {

        const getNextArtist = () => {
            let artistName = '';
            do {
                artistName = predefineArtistFullNames[Math.floor(Math.random() * predefineArtistFullNames.length)]
            } while (usedArtists.includes(artistName))
            return artistName;
        }

        const nextArtistName = getNextArtist();
        setUsedArtists([...usedArtists, nextArtistName]);

        fetchArtistId(nextArtistName).
            then(id => {
                setArtistId(id);
                setArtistName(nextArtistName);
            });


    }

    const onRoundFinished = (roundScore: number) => {
        setTotalScore(totalScore + roundScore)

        if (roundCount < _maxRoundCount) {
            setRoundCount(roundCount + 1);
            setNewRound()
        } else {
            onGameOver(totalScore + roundScore)
        }
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: 3,
                backgroundColor: 'background.default',
            }}
        >
            <Typography
                variant="h3"
                component="div"
                sx={{ 
                    fontWeight: 'bold',
                    marginBottom: 3,
                    fontFamily: "'Roboto Slab', serif"
                }}
            >
                Guess The Artist
            </Typography>

            <Stack
                sx={{ 
                    padding: 1,
                    borderRadius: '4px',
                    backgroundColor: green[500],
                    color: 'common.white'
                }}
                direction={'row'}
                spacing={5}
            >
                <Typography>
                    Round {roundCount}
                </Typography>
            </Stack>

            {artistId !== undefined &&
                <GameRound
                    artistId={artistId}
                    artistName={artistName}
                    onRoundFinished={onRoundFinished}
                />}
        </Box>
    );
}