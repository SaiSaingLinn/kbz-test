import Home from '../pages/home';
import LogIn from '../pages/logIn';
import Register from '../pages/register';
import PageNotFound from '../pages/404';

const Routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/login',
    component: LogIn,
  },
  {
    path: '*',
    component: PageNotFound,
  }
]

export default Routes