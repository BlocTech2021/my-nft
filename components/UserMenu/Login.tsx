import { MailIcon } from '@heroicons/react/solid'

export default function Login() {
  return (
    <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
    Login with Metamask
    <MailIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
    </button>
  )
}