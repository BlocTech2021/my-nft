import { useAuth } from '../../lib/contexts/auth';
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