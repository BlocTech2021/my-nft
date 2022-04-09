import { useCookies } from 'react-cookie'
import { useAuth } from '../../lib/contexts/auth';
import { LoggedinUser } from '../../lib/types'
import { LOGGEDIN_USER_COOKIE_NAME } from './constants';
import LoggedIn from './LoggedIn';
import Login from './Login';

function UserMenu() {
 const { isLoggedIn, user } = useAuth()

  if (isLoggedIn) {
    return <LoggedIn user={user!.user} />
  } else {
    return <Login />
  }
}

export default UserMenu;