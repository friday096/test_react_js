import React from 'react';
import Home from './containers/Home';
import Login from './pages/AuthUser/Login';
import Register from './pages/AuthUser/Register';
import ForgetPassword from './pages/AuthUser/ForgetPassword';
import ResetPassword from './pages/AuthUser/ResetPassword';
import Project from './views/project/Project';
// import Template1 from './views/project/Template1';
// import Template2 from './views/project/Template2';
// import Template3 from './views/project/Template3';
// import Template4 from './views/project/Template4';
import CreateProject from './views/project/CreateProject';
import AuthChecker from './pages/AuthUser/AuthChecker';
import EditProject from './views/project/EditProject';
import EmailNotify from './pages/AuthUser/EmailNotify';
const routes = [
    { path: '/', element:<Login /> },
    { path: 'register', state: true, element: <Register /> },
    { path: 'login', state: true, element: <Login /> },
    { path: 'reset', state: true, element: <ResetPassword /> },
    { path: 'forget', state: true, element: <ForgetPassword /> },
    { path: 'confirm/:email', element: <EmailNotify /> },
    { path: 'authchecker/:id', state: true, element: <AuthChecker /> },
    { path: 'reset', state: true, element: <ResetPassword /> },
    { path: 'project', state: true, element: <Project /> },
    { path: 'create-project', state: true, element: <CreateProject /> },
    { path: 'edit-project/:id', state: true, element: <EditProject /> },

]


export default routes;
