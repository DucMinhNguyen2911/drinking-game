import {
    Box,
    Button,
    Container,
    Fade,
    Grid,
    Modal,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchWrapper, history } from '../_helpers';
import './cards.css';
import { addNotification } from '../_store';

export { AICards };

const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ];
    }
    return shuffledArray;
};
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#EEF7FF',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
};
function AICards() {
    document.title = 'Game';
    const { setId } = useParams();
    const dispatch = useDispatch();
    const authUser = useSelector((x) => x.auth.user);

    const baseUrl = `${process.env.REACT_APP_API_URL}/cards`;

    const showNotification = (message, notificationType) => {
        dispatch(addNotification({ message, notificationType }));
    };

    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const handleNext = () => {
        setFlipped(!flipped);
        setTimeout(() => {
            if (currentIndex + 1 < cards.length) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
                setFlipped(false);
            } else {
                setShowModal(true);
            }
            //setFlipped(false);
        }, 600); // Full transition time
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setShowModal(false);
        onGet();
    };

    const handleCloseModal = () => {
        setFlipped(false);
        setShowModal(false);
    };

    function onGet() {
        fetchWrapper
            .get(`${baseUrl}/ai-generated`)
            .then((response) => {
                if (response.success) {
                    setCards(shuffleArray(response.data.cards));
                    setFlipped(false);
                } else {
                    response.messages.forEach((message) => {
                        showNotification(message, 'error');
                    });
                }
            })
            .catch((errors) => {
                if (errors instanceof TypeError) {
                    showNotification(errors.message, 'error');
                } else {
                    errors.forEach((error) => {
                        showNotification(error, 'error');
                    });
                }
                history.navigate("/sets");
            });
    }

    useEffect(() => {
        onGet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 10 }}>
            <Box className="card-container" margin="auto">
                <Box className="flip-card">
                    <Box
                        className={`flip-card-inner ${
                            flipped ? 'flipped' : ''
                        }`}
                    >
                        <Box className="flip-card-front">
                            <Typography fontWeight={700} fontSize={25}>
                                {cards[currentIndex] &&
                                    cards[currentIndex].text}
                            </Typography>
                        </Box>
                        <Box className="flip-card-back"></Box>
                    </Box>
                </Box>
                <Grid container columnSpacing={2} rowSpacing={2} sx={{ my: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: '#EEF7FF',
                                color: '#4D869C',
                                ':hover': { bgcolor: '#D9E2EA' },
                            }}
                            onClick={handleNext}
                            disabled={flipped}
                        >
                            Pass
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: '#4D869C',
                                color: '#EEF7FF',
                                ':hover': { bgcolor: '#5695AE' },
                            }}
                            onClick={handleNext}
                            disabled={flipped}
                        >
                            Done
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Modal
                open={showModal}
                onClose={() => handleCloseModal()}
                closeAfterTransition
            >
                <Fade in={showModal}>
                    <Box sx={modalStyle}>
                        <Typography variant="h5" gutterBottom color="#4D869C">
                            All cards have been flipped in this set. Do you want to play again?
                        </Typography>
                        <Grid
                            container
                            columnSpacing={2}
                            rowSpacing={2}
                            sx={{ my: 2 }}
                        >
                            <Grid item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleRestart}
                                    fullWidth
                                    sx={{
                                        height: '100%',
                                        bgcolor: '#4D869C',
                                        color: '#EEF7FF',
                                        ':hover': { bgcolor: '#5695AE' },
                                    }}
                                >
                                    Yes
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    component={Link}
                                    to="/sets"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{
                                        height: '100%',
                                        bgcolor: '#EEF7FF',
                                        color: '#4D869C',
                                        ':hover': { bgcolor: '#D9E2EA' },
                                    }}
                                >
                                    Choose another set
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </Container>
    );
}
