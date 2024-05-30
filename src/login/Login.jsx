import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { authActions } from '../_store';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { addNotification, clearNotifications } from '../_store';

export { Login };

function Login() {
    document.title = 'Sign In';
    const dispatch = useDispatch();
    const authUser = useSelector((x) => x.auth.user);
    const authError = useSelector((x) => x.auth.error);
    const navigate = useNavigate();
    const showNotification = (message, notificationType) => {
        dispatch(addNotification({ message, notificationType }));
    };
    const validationSchema = Yup.object().shape({
        userNameOrEmail: Yup.string().required('Username/Email is required'),
        password: Yup.string().required('Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ userNameOrEmail, password }) {
        dispatch(clearNotifications());
        return dispatch(authActions.login({ userNameOrEmail, password }));
    }
    useEffect(() => {
        if (authError) {
            if (authError instanceof TypeError) {
                // Network error
                showNotification(authError.message, 'error');
            } else {
                // Handle fetch error
                authError.forEach((error) => {
                    showNotification(error, 'error');
                });
            }
        }
    }, [authError]);

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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userNameOrEmail"
                        label="Username or Email"
                        name="userNameOrEmail"
                        autoComplete="userNameOrEmail"
                        autoFocus
                        {...register('userNameOrEmail')}
                        error={errors.userNameOrEmail != null}
                        helperText={
                            errors.userNameOrEmail
                                ? errors.userNameOrEmail?.message
                                : ''
                        }
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register('password')}
                        error={errors.password != null}
                        helperText={
                            errors.password ? errors.password?.message : ''
                        }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isSubmitting}
                    >
                        Sign In
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

                    <Grid container>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <RouterLink to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
