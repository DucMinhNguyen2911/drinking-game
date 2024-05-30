//import { userActions } from '_store';
import { PlaylistAdd } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchWrapper, history } from '../_helpers';
import { addNotification, clearNotifications } from '../_store';
export { CreateSets };

function CreateSets() {
    document.title = 'Card sets';

    const dispatch = useDispatch();
    const { user: authUser } = useSelector((x) => x.auth);
    const showNotification = (message, notificationType) => {
        dispatch(addNotification({ message, notificationType }));
    };

    const { handleSubmit, formState } = useForm();
    const { isSubmitting } = formState;

    const baseUrl = `${process.env.REACT_APP_API_URL}/card-sets`;

    const [inputSetName, setInputSetName] = useState('');
    const [inputSetDescription, setInputSetDescription] = useState('');

    const handleInputSetNameChange = (event) => {
        setInputSetName(event.target.value);
    };

    const handleInputSetDescriptionChange = (event) => {
        setInputSetDescription(event.target.value);
    };

    const onSubmit = async () => {
        dispatch(clearNotifications());
        await fetchWrapper
            .post(`${baseUrl}/personal`, {
                name: inputSetName,
                description: inputSetDescription,
            })
            .then((response) => {
                if (response.success) {
                    showNotification('Set added', 'success');
                } else {
                    response.messages.forEach((message) => {
                        showNotification(message, 'error');
                    });
                }
                history.navigate("/sets");
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
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#7AB2B2' }}>
                    <PlaylistAdd sx={{ color: 'white' }} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create a new personal set
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                required
                                fullWidth
                                id="setName"
                                label="Name"
                                name="setName"
                                value={inputSetName}
                                onChange={handleInputSetNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="setDescription"
                                label="Description"
                                name="setDescription"
                                value={inputSetDescription}
                                onChange={handleInputSetDescriptionChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        columnSpacing={2}
                        rowSpacing={0}
                        sx={{ mb: 2 }}
                    >
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
                                disabled={isSubmitting}
                            >
                                Create
                                {isSubmitting && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: blue[500],
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }}
                                    />
                                )}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                component = {Link}
                                to = "/sets"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
                                color="error"
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
