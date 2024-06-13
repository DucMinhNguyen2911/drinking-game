import { Container, ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import {
    AuthenticatedRoute,
    Navbar,
    Notification,
    UnauthenticatedRoute,
    UserLevelRequiredRoute,
} from './_components';
import { history } from './_helpers';
import { Home } from './home';
import { Login } from './login';
import { Pricing } from './pricing';
import { ChangePassword, Profile } from './profile';
import { Register } from './register';
import { CreateSets, EditSet, Sets } from './sets';
import { Cards, AICards } from './cards';

export { App };
const defaultTheme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#892CDC',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FFFFFF',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#BC6FF1',
                    },
                    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#b8b8b8',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    '&.Mui-disabled': {
                        color: '#b8b8b8',
                    },
                    '&.Mui-focused': {
                        color: '#BC6FF1',
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: '#FFFFFF',
                    '&.Mui-disabled': {
                        color: '#b8b8b8',
                    },
                },
            },
        },
        MuiStepLabel: {
            styleOverrides: {
                label: {
                    color: 'white',
                    '&.Mui-active': {
                        color: 'white',
                    },
                    '&.Mui-completed': {
                        color: 'white',
                    },
                },
            },
        },
        MuiStepIcon: {
            styleOverrides: {
                root: {
                    '&.Mui-completed': {
                        color: 'black',
                    },
                },
            },
        },
    },
});

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <Navbar />
                <Notification />
                <Container
                    component="main"
                    maxWidth="lg"
                    sx={{ bgcolor: '#892CDC', minHeight: '100vh' }}
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route
                            path="/profile"
                            element={
                                <AuthenticatedRoute>
                                    <Profile />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/profile/password"
                            element={
                                <AuthenticatedRoute>
                                    <ChangePassword />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/sets"
                            element={
                                <AuthenticatedRoute>
                                    <Sets />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/sets/:setId/cards"
                            element={
                                <AuthenticatedRoute>
                                    <Cards />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/sets/ai-generated"
                            element={
                                <AuthenticatedRoute>
                                    <UserLevelRequiredRoute
                                        userLevelRequired={2}
                                    >
                                        <AICards />
                                    </UserLevelRequiredRoute>
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/sets/create"
                            element={
                                <AuthenticatedRoute>
                                    <UserLevelRequiredRoute
                                        userLevelRequired={2}
                                    >
                                        <CreateSets />
                                    </UserLevelRequiredRoute>
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/sets/:setId/edit"
                            element={
                                <AuthenticatedRoute>
                                    <UserLevelRequiredRoute
                                        userLevelRequired={2}
                                    >
                                        <EditSet />
                                    </UserLevelRequiredRoute>
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <UnauthenticatedRoute>
                                    <Login />
                                </UnauthenticatedRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <UnauthenticatedRoute>
                                    <Register />
                                </UnauthenticatedRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Container>
            </ThemeProvider>
        </>
    );
}
