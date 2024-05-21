import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react'
import { history } from './_helpers';
import { Container } from '@mui/material';
import { Home } from './home';
import { Login } from './login';
import { Register } from './register';
import { Navbar, AuthenticatedRoute, UnauthenticatedRoute } from './_components';
import CssBaseline from '@mui/material/CssBaseline';
export { App };
function App() {
  history.navigate = useNavigate();
  history.location = useLocation();
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="md">
        <Routes>
          <Route
            path="/"
            element=
            {
              <Home />
            }
          />
          <Route path="/login" element={
            <UnauthenticatedRoute>
              <Login />
            </UnauthenticatedRoute>}
          />
          <Route path="/register" element={
            <UnauthenticatedRoute>
              <Register />
            </UnauthenticatedRoute>}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  )
}

