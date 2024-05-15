import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { NotFound } from "../pages/NotFound/NotFound";
import { Courses } from "../pages/Courses/Courses";
import { MainLayout } from "../components/layouts/MainLayout/MainLayout";
import { AuthContextProvider } from "../contexts/AuthContext/AuthContextProvider";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { UserRegistration } from "../pages/UserRegistration/UserRegistration";
import { UserLogin } from "../pages/UserLogin/UserRegistration";
import { Users } from "../pages/Users/Users";
import { CourseRegistration } from "../pages/CourseRegistration/CourseRegistration";
const routes = createBrowserRouter([
    {
        element: (
            <AuthContextProvider>
                <MainLayout />
            </AuthContextProvider>
        ),
        children: [
            {
                path: "/",
                children: [
                    {
                        path: "",
                        element: <Home />,
                    },
                    {
                        path: "courses/",
                        children: [
                            {
                                path: "",
                                element: <Courses />,
                            },
                            {
                                path: "insert/",
                                element: (
                                    <ProtectedRoute>
                                        <CourseRegistration />,
                                    </ProtectedRoute>
                                ),
                            },
                        ],
                    },
                    {
                        path: "user/",
                        children: [
                            {
                                path: "register/",
                                element: <UserRegistration />,
                            },
                            {
                                path: "login/",
                                element: <UserLogin />,
                            },
                            {
                                path: "users/",
                                element: (
                                    <ProtectedRoute>
                                        <Users />,
                                    </ProtectedRoute>
                                ),
                            },
                        ],
                    },
                ],
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export function Routes() {
    return <RouterProvider router={routes} />;
}
