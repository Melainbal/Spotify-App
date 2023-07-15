import { Box, Typography } from "@mui/material";
import { AlbumImage as Image, SpotifyAlbumModel } from "../models";
import { green, grey } from '@mui/material/colors';


export type SpotifyAlbumProps = {
    album: SpotifyAlbumModel
    showReleaseDate: boolean
}

export function SpotifyAlbum({ album, showReleaseDate }: SpotifyAlbumProps) {
    let selectedAlbumImage: Image | undefined = undefined

    if (album.images.length > 0) {
        selectedAlbumImage = album.images[1]
    }

    return (
        <Box
            sx={{
                padding: 2,
                backgroundColor: 'background.default',
                marginBottom: 3,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                variant="h6"
                component="div"
                sx={{ 
                    fontWeight: 'bold',
                    marginBottom: 2
                }}
            >
                Album Name: {album.name}
            </Typography>

            {selectedAlbumImage !== undefined &&
                <Box 
                    component="img"
                    src={selectedAlbumImage.url}
                    alt="description"
                    sx={{ 
                        width: selectedAlbumImage.width, 
                        height: selectedAlbumImage.height,
                        border: `1px solid ${grey[300]}`,
                        borderRadius: 1,
                        padding: 1,
                        marginBottom: 0
                    }}
                />
            }

            {showReleaseDate &&
                <Typography
                    sx={{ 
                        color: green[500],
                    }}
                >
                    Hint - the album's release Date is: {album.release_date}
                </Typography>}
        </Box>
    );
}