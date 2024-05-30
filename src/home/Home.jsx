//import { userActions } from '_store';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
export { Home };

function Home() {
    document.title = 'Drinking Game';
    return (
        <Container maxWidth="xs" sx={{ mt: 10 }}>
            <Box color="#4D869C" sx={{ mb: 5 }}>
                <Typography
                    variant="h1"
                    fontSize="37px"
                    fontWeight="700"
                    lineHeight="1.2"
                    textAlign={'center'}
                    sx={{ mb: 3 }}
                >
                    Online Drinking Game
                </Typography>
                <Typography
                    variant="h2"
                    fontSize="24px"
                    fontWeight="700"
                    lineHeight="1.2"
                    textAlign={'center'}
                    sx={{ mb: 2 }}
                >
                    The game is simple:
                </Typography>
                <Typography gutterBottom textAlign={'center'}>
                    Choose the set, flip the card, do what the card says, and press 'Done' to
                    score a point. If you're not up for it, take a drink and
                    press 'Pass' to pass the turn to the next player.
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button
                    component={Link}
                    to="/sets"
                    variant="contained"
                    size="large"
                    sx={{
                        bgcolor: '#4D869C',
                        ':hover': { bgcolor: '#7AB2B2' },
                    }}
                >
                    Let's get drunk
                </Button>
            </Box>
        </Container>
    );
}
