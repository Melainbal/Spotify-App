import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { fetchArtistAlbums } from "../api";
import { SpotifyAlbum } from "../components";
import { getRandomElements } from "../models/utils";
import { SpotifyAlbumModel } from "../models";



const _maxGuessCount = 3;

const _guessCountToRewardPoints: { [guessCount: number]: number } = {
    [1]: 5,
    [2]: 3,
    [3]: 1
}

export type GameRoundProps = {
    artistId: string;
    artistName: string;
    onRoundFinished: (roundScore: number) => void
}

export const GameRound = ({ artistId, artistName, onRoundFinished }: GameRoundProps) => {
    const [albums, setAlbums] = useState<SpotifyAlbumModel[]>([])
    const [roundGuessCount, setRoundGuessCount] = useState(0);
    const artistNameInputRef = useRef<any>()

    useEffect(
        () => {
            setRoundGuessCount(0);
            fetchArtistAlbums(artistId).
                then(albums => {
                    const randomAlbums =
                        getRandomElements(
                            albums.filter(
                                (album: SpotifyAlbumModel) =>
                                    album.album_group === "album" &&
                                    album.album_type === "album"),
                            album => album.id,
                            3);
                    return setAlbums(randomAlbums);
                }
                );
        },
        [artistId])

    const submitGuess = () => {
        const newGuessCount = roundGuessCount + 1
        const artistNameGuess = artistNameInputRef.current.value;
        if (artistNameGuess === '')
            return;

        // calculate round points 
        if (artistNameGuess === artistName) {
            onRoundFinished(_guessCountToRewardPoints[newGuessCount])
        }
        else if (newGuessCount === _maxGuessCount) {
            onRoundFinished(0)
        } else {
            setRoundGuessCount(newGuessCount)
        }
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
                backgroundColor: 'background.default',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                    marginBottom: 0
                }}
            >
                {
                    albums.slice(0, roundGuessCount + 1).map((album, albumIndex) =>
                        <SpotifyAlbum
                            key={album.id}
                            album={album}
                            showReleaseDate={albumIndex === _maxGuessCount - 1} />
                    )
                }
            </Box>

            <Stack
                sx={{ 
                    marginBottom: 1,
                }}
                direction={'row'}
                spacing={5}
            >
                <Typography>
                    Guess number: {roundGuessCount+1}
                </Typography>
            </Stack>

            <Typography
                sx={{ 
                    marginBottom: 2,
                }}
            >
                Guess the artist name:
            </Typography>

            <TextField
                label="Artist Name"
                variant="outlined"
                sx={{ 
                    marginBottom: 3,
                }}
                inputRef={artistNameInputRef} />

            <Button 
                variant="contained"
                color="primary"
                onClick={submitGuess}
            >
                Submit Answer
            </Button>
        </Box>
    );
}