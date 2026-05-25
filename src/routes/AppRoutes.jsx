import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Intro from '../pages/Intro';
import JoaoHome from '../pages/JoaoHome';
import EllenHome from '../pages/EllenHome';
import Login from '../pages/Login';
import AdminTags from '../pages/AdminTags';
import CreatePost from '../pages/CreatePost';
import EditPost from '../pages/EditPost';
import PostDetails from '../pages/PostDetails';

import ProtectedRoute from './ProtectedRoute';
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

                    <Route
                        path="/:author/post/:id"
                        element={<PostDetails />}
                    />

                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/admin/tags"
                            element={<AdminTags />}
                        />

                        <Route
                            path="/admin/posts/create"
                            element={<CreatePost />}
                        />

                        <Route
                            path="/admin/posts/:id/edit"
                            element={<EditPost />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}