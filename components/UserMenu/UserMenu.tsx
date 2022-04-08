import { useCookies } from 'react-cookie'
import { LoggedinUser } from '../../lib/types'
import { LOGGEDIN_USER_COOKIE_NAME } from './constants';
import LoggedIn from './LoggedIn';
import Login from './Login';

function UserMenu() {
  const [cookie] = useCookies([LOGGEDIN_USER_COOKIE_NAME]);

  const loggedinUser: LoggedinUser | undefined = cookie[LOGGEDIN_USER_COOKIE_NAME];

  console.log(`cookie: ${JSON.stringify(cookie)}`);

  if (loggedinUser) {
    return <LoggedIn user={loggedinUser.user} />
  } else {
    return <Login />
  }
}

export default UserMenu;