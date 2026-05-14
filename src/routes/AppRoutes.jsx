import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Intro from '../pages/Intro';
import Login from '../pages/Login';
import JoaoHome from '../pages/JoaoHome';
import EllenHome from '../pages/EllenHome';

import MainLayout from '../components/layouts/MainLayout';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* páginas independentes */}
                <Route
                    path="/"
                    element={<Intro />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* páginas com layout compartilhado */}
                <Route element={<MainLayout />}>

                    <Route
                        path="/joao"
                        element={<JoaoHome />}
                    />

                    <Route
                        path="/ellen"
                        element={<EllenHome />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    )
}