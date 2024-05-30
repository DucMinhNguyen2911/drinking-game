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
                    backgroundColor: '#CDE8E5',
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
                    sx={{ bgcolor: '#CDE8E5', minHeight: '100vh' }}
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
                                    <UserLevelRequiredRoute userLevelRequired={2}>
                                        <AICards />
                                    </UserLevelRequiredRoute>
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/sets/create"
                            element={
                                <AuthenticatedRoute>
                                    <UserLevelRequiredRoute userLevelRequired={2}>
                                        <CreateSets />
                                    </UserLevelRequiredRoute>
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/sets/:setId/edit"
                            element={
                                <AuthenticatedRoute>
                                    <UserLevelRequiredRoute userLevelRequired={2}>
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
