import { User } from '../../lib/types'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { shortenAddress } from '../../helpers/utils'
import { useCookies } from 'react-cookie'
import { LOGGEDIN_USER_COOKIE_NAME } from './constants'
import Link from 'next/link'
import { useRouter } from 'next/router'

type LoggedInProps = {
  user: User
}

export default function LoggedIn({ user }: LoggedInProps) {
  const { address } = user;

  const [_cookie, _, removeCookie] = useCookies([LOGGEDIN_USER_COOKIE_NAME]);

  const router = useRouter();

  const items = [
    { name: 'My Room', href: '/main-room'
    },
    { name: 'Logout', href: '#', onClick: (e: any) => {
        e.preventDefault();
        removeCookie(LOGGEDIN_USER_COOKIE_NAME);
        router.push('/');
      }
    },
  ]

  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <button
        type="button"
        className="relative inline-flex items-center px-4 py-2 rounded-l-md bg text-sm font-medium text-pearl focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        { shortenAddress(address) }
      </button>
      <Menu as="span" className="-ml-px relative block">
        <Menu.Button className="relative inline-flex items-center px-2 py-2 rounded-r-md bg text-sm font-medium text-pearl focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
          <span className="sr-only">Open options</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-1 -mr-1 w-56 rounded-md shadow-lg  text-pearl ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1 bg">
              {items.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link href={item.href}>
                      <a
                        href={item.href}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-pearl'
                        )}
                        onClick={item.onClick}
                      >
                        {item.name}
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </span>
  )
}