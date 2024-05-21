import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { fetchWrapper } from '../_helpers';
import { history } from '../_helpers';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
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
export { Register };

function Register() {
    document.title = "Sign Up";
    const authUser = useSelector(x => x.auth.user);
    // useEffect(() => {
    //     // redirect to home if already logged in
    //     if (authUser) history.navigate('/');

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('Username is required').min(5, 'Must be more than 5 characters').max(10, 'Must be less than 10 characters'),
        password: Yup.string().required('Password is required').min(6, 'Must be more than 6 characters').max(50, 'Must be less than 50 characters'),
        firstName: Yup.string().required('First name is required').min(1, 'Must be more than 1 character').max(50, 'Must be less than 50 characters'),
        lastName: Yup.string().required('Last name is required').min(1, 'Must be more than 1 character').max(50, 'Must be less than 50 characters'),
        email: Yup.string().required('Email is required').email("A valid email address is required")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const [errorMessages, setErrorMessages] = useState([]);

    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
    const onSubmit = async ({ userName, email, firstName, lastName, password }) => {
        setErrorMessages([]);
        fetchWrapper.post(`${baseUrl}/register`, { userName, email, firstName, lastName, password }).then((response) => {
            if (response.success) {
                history.navigate('/login')
            }
            else {
                setErrorMessages(response.messages);
            }
        })
        .catch((error) => {
            // Handle fetch error
            setErrorMessages([error]);
        });;
    }
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    {...register('firstName')}
                                    error={errors.firstName != null}
                                    helperText={errors.firstName ? errors.firstName?.message : ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    {...register('lastName')}
                                    error={errors.lastName != null}
                                    helperText={errors.lastName ? errors.lastName?.message : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="userName"
                                    label="Username"
                                    name="userName"
                                    {...register('userName')}
                                    error={errors.userName != null}
                                    helperText={errors.userName ? errors.userName?.message : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    {...register('email')}
                                    error={errors.email != null}
                                    helperText={errors.email ? errors.email?.message : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    {...register('password')}
                                    error={errors.password != null}
                                    helperText={errors.password ? errors.password?.message : ""}
                                />
                            </Grid>
                        </Grid>
                        {errorMessages?.map((message) => (
                            <Alert 
                                key={message} 
                                severity="error" 
                                sx={{ my: 1 }}
                                
                            >
                                {message}
                            </Alert>
                        ))}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isSubmitting}
                        >
                            Sign Up
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
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <RouterLink to="/login" variant="body2">
                                    Already have an account? Sign in
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
