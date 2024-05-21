import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { history } from '_helpers';
import { authActions } from '../_store';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Alert } from '@mui/material';

export { Login };

function Login() {
    document.title = "Sign In";
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);
    const navigate = useNavigate();
    // useEffect(() => {
    //     // redirect to home if already logged in
    //     if (authUser) {
    //         navigate('/');
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [navigate]);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        userNameOrEmail: Yup.string().required('Username/Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ userNameOrEmail, password }) {
        return dispatch(authActions.login({ userNameOrEmail, password }));
    }

    // TODO remove, this demo shouldn't need to reset the theme.

    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
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
                            error={errors.userNameOrEmail!=null}
                            helperText={errors.userNameOrEmail ? errors.userNameOrEmail?.message : ""}
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
                            error={errors.password!=null}
                            helperText={errors.password ? errors.password?.message : ""}
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
                        {authError &&
                            <Alert severity="error"  sx={{ my: 1 }}>{authError.message}</Alert>
                        }
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
        </ThemeProvider>
    );
}
