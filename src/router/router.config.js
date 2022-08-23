import Home from '../pages/home';
import AddCustomer from '../pages/addCustomer';
import LogIn from '../pages/logIn';
import PageNotFound from '../pages/404';

const Routes = [
  {
    path: "/",
    component: Home,
    protect: true
  },
  {
    path: "/addCustomer",
    component: AddCustomer,
    protect: true
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