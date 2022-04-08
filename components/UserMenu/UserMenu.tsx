import { useCookies } from 'react-cookie'
import { User } from '../../helpers/types'
import LoggedIn from './LoggedIn';
import Login from './Login';

function UserMenu() {
  const [cookie] = useCookies(['user']);

  const user: User | undefined = cookie['user'];

  console.log(`cookie: ${JSON.stringify(cookie)}`);

  if (user) {
    return <LoggedIn user={user} />
  } else {
    return <Login />
  }
}

export default UserMenu;