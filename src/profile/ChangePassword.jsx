import { Password } from '@mui/icons-material';
import { Alert, CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { fetchWrapper } from '../_helpers';
import { addNotification, clearNotifications } from '../_store';
export { ChangePassword };

function ChangePassword() {
    document.title = 'Profile';
    const dispatch = useDispatch();
    const { user: authUser } = useSelector((x) => x.auth);
    const showNotification = (message, notificationType) => {
        dispatch(addNotification({ message, notificationType }));
    };

    const { handleSubmit, formState } = useForm();
    const { isSubmitting } = formState;

    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

    const [errorMessages, setErrorMessages] = useState([]);

    const [inputOldPassword, setInputOldPassword] = useState('');
    const [inputNewPassword, setInputNewPassword] = useState('');

    const handleInputOldPasswordChange = (event) => {
        setInputOldPassword(event.target.value);
    };

    const handleInputNewPasswordChange = (event) => {
        setInputNewPassword(event.target.value);
    };

    const onSubmit = async () => {
        dispatch(clearNotifications());
        await fetchWrapper
            .put(`${baseUrl}/${authUser.id}/password`, {
                oldPassword: inputOldPassword,
                newPassword: inputNewPassword,
            })
            .then((response) => {
                if (response.success) {
                    setInputOldPassword('');
                    setInputNewPassword('');
                    showNotification('Password changed', 'success');
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
                    <Password />
                </Avatar>
                <Typography component="h1" variant="h5" color={'#FFFFFF'}>
                    Mật khẩu
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
                                fullWidth
                                id="oldPassword"
                                label="Mật khẩu cũ"
                                name="oldPassword"
                                type="password"
                                autoFocus
                                value={inputOldPassword}
                                onChange={handleInputOldPasswordChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="newPassword"
                                label="Mật khẩu mới"
                                name="newPassword"
                                type="password"
                                value={inputNewPassword}
                                onChange={handleInputNewPasswordChange}
                            />
                        </Grid>
                    </Grid>
                    {errorMessages?.map((message) => (
                        <Alert key={message} severity="error" sx={{ my: 1 }}>
                            {message}
                        </Alert>
                    ))}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 2,
                            mb: 2,
                            bgcolor: '#000000',
                            color: '#FFFFFF',
                            ':hover': { bgcolor: '#1a1a1a' },
                        }}
                        disabled={isSubmitting}
                    >
                        Đổi mật khẩu
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
                    <Grid container justifyContent="flex-end">
                        <Grid
                            item
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <RouterLink to="/profile" variant="body2">
                                Quay lại
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
