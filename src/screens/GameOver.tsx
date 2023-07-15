import { Box, Typography } from "@mui/material";


export type GameOverProps = {
    score: number;
}


export const GameOver = ({ score }: GameOverProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 3,
                borderRadius: '4px',
                backgroundImage: 'linear-gradient(to right, #006400, #000080)',
                color: 'common.white'
            }}
        >
            <Typography
                variant="h2"
                component="div"
                sx={{ 
                    fontWeight: 'bold',
                    marginBottom: 3,
                    fontFamily: "'Roboto Slab', serif"
                }}
            >
                Game Over
            </Typography>
            <Typography
                variant="h4"
                component="div"
                sx={{
                    fontFamily: "'Roboto Slab', serif"
                }}
            >
                Score: {score}
            </Typography>
        </Box>
    );
}