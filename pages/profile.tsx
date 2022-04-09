import { CalendarIcon, ChevronRightIcon, SpeakerphoneIcon, TerminalIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const items = [
  {
    name: 'Your room',
    description: 'Setup your room',
    href: '#',
    iconColor: 'bg-pink-500',
    icon: SpeakerphoneIcon,
  },
  {
    name: 'Profile',
    description: 'Setup your username so you can share your room',
    href: '#',
    iconColor: 'bg-purple-500',
    icon: TerminalIcon,
  },
]

const Profile: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-lg font-medium text-gray-900">Profile</h2>
              <p className="mt-1 text-sm text-gray-500">Get started by decorating your room and setup your profile.</p>
              <ul role="list" className="mt-6 border-t border-b border-gray-200 divide-y divide-gray-200">
              {items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <div className="relative group py-4 flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <span
                        className={classNames(item.iconColor, 'inline-flex items-center justify-center h-10 w-10 rounded-lg')}
                      >
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        <a href={item.href}>
                          <span className="absolute inset-0" aria-hidden="true" />
                          {item.name}
                        </a>
                      </div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    </div>
                  </div>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile