import { Transition } from "@headlessui/react"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid"
import { Fragment } from "react"
import toast from "react-hot-toast"

export function toastSuccess(message: string) {
  toastCustom(<CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />, message);
}

export function toastError(message: string) {
  toastCustom(<XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />, message);
}

function toastCustom(icon: JSX.Element, message: string) {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="max-w-sm w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {icon}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{message}</p>
                </div>
              </div>
            </div>
          </div>
        
      </div>
    </div>
  ))
}