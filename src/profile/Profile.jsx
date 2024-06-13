import { AccountCircle } from '@mui/icons-material';
import { CircularProgress, Step, StepLabel, Stepper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { fetchWrapper, history } from '../_helpers';
import { addNotification, authActions, clearNotifications } from '../_store';
export { Profile };

function Profile() {
    document.title = 'Profile';
    const dispatch = useDispatch();
    const { user: authUser } = useSelector((x) => x.auth);
    const logout = () => dispatch(authActions.logout());

    const showNotification = (message, notificationType) => {
        dispatch(addNotification({ message, notificationType }));
    };
    const { handleSubmit, formState } = useForm();
    const { isSubmitting } = formState;

    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

    const [userLevel, setUserLevel] = useState(1);
    const [inputUserName, setInputUserName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputFirstName, setInputFirstName] = useState('');
    const [inputLastName, setInputLastName] = useState('');

    const levels = ['Cấp 1', 'Cấp 2', 'Cấp 3'];
    const handleInputFirstNameChange = (event) => {
        setInputFirstName(event.target.value);
    };

    const handleInputLastNameChange = (event) => {
        setInputLastName(event.target.value);
    };

    function onGet() {
        fetchWrapper.get(`${baseUrl}/${authUser.id}`).then((response) => {
            setUserLevel(response.data.userLevel);
            setInputUserName(response.data.userName);
            setInputEmail(response.data.email);
            setInputFirstName(response.data.firstName);
            setInputLastName(response.data.lastName);
        });
    }

    useEffect(() => {
        onGet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async () => {
        dispatch(clearNotifications());
        await fetchWrapper
            .put(`${baseUrl}/${authUser.id}/info`, {
                firstName: inputFirstName,
                lastName: inputLastName,
            })
            .then((response) => {
                if (response.success) {
                    onGet();
                    showNotification('Profile updated', 'success');
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
                <Avatar sx={{ m: 1, bgcolor: '#BC6FF1' }}>
                    <AccountCircle sx={{ color: 'white' }} />
                </Avatar>
                <Typography component="h1" variant="h5" color={'#FFFFFF'}>
                    Tôi
                </Typography>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <Stepper activeStep={userLevel} alternativeLabel>
                        {levels.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                id="userName"
                                label="Tên người dùng"
                                name="userName"
                                value={inputUserName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                id="email"
                                label="Địa chỉ email"
                                name="email"
                                value={inputEmail}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Họ"
                                autoFocus
                                value={inputFirstName}
                                onChange={handleInputFirstNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Tên"
                                name="lastName"
                                value={inputLastName}
                                onChange={handleInputLastNameChange}
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
                                sx={{
                                    mt: 2,
                                    bgcolor: '#FFFFFF',
                                    color: '#000000',
                                    ':hover': { bgcolor: '#fafafa' },
                                }}
                                disabled={isSubmitting}
                            >
                                Cập nhật
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
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    bgcolor: '#000000',
                                    color: '#FFFFFF',
                                    ':hover': { bgcolor: '#1a1a1a' },
                                }}
                                onClick={logout}
                                color="error"
                            >
                                Đăng xuất
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="flex-end">
                        <Grid
                            item
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <RouterLink to="/profile/password" variant="body2">
                                Thay đổi mật khẩu
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
