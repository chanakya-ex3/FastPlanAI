import { Route, Routes, Navigate } from 'react-router-dom';
import { Auth, Home, Team } from '../pages';
import Project from '../pages/Project/Project';
import Tasks from '../pages/Tasks/Tasks';

// eslint-disable-next-line react/prop-types
const RoutesComponent = ({isAuthenticated}) => {
  const role = localStorage.getItem('role');
  const routesConfig = [
    {
      path: '/auth',
      component: <Auth />,
      roles: ['PM', 'TM', 'admin'], // Accessible to all
    },
    {
      path: '/team',
      component: <Team />,
      roles: ['PM', 'TM'],
    },
    {
      path:'/home',
      component: <Home />,
      roles: ['PM', 'TM'],
    },
    {
      path: '/project',
      component: <Project />,
      roles: ['PM'],
    },
    {
      path : '/tasks',
      component: <Tasks />,
      roles: ['TM'],  
    }
  ];
  if(!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  return (
    <Routes>
      {routesConfig.map((route, index) =>
        route.roles.includes(role) ? (
          <Route key={index} path={route.path} element={route.component} />
        ) : null
      )}
      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  );
};

export default RoutesComponent;
