import { PropsWithChildren } from "react"
import { BadgeProps } from "./types"

function classNames(...classes: Array<string | null | undefined | boolean>) {
  return classes.filter(Boolean).join(" ")
}
export const Badge: React.FC<PropsWithChildren<BadgeProps>> = (props) => {
  return (
    <span
      id="badge-dismiss-default"
      className={classNames(
        props.className,
        "inline-flex items-center py-1 px-2 mr-2 text-sm font-medium text-white bg-amber-500 rounded"
      )}>
      {props.children}
      <button
        type="button"
        className="inline-flex items-center p-0.5 ml-2 text-sm text-white bg-transparent rounded-sm hover:bg-white hover:text-amber-500"
        data-dismiss-target="#badge-dismiss-default"
        aria-label="Remove">
        <svg
          aria-hidden="true"
          className="w-3.5 h-3.5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
        <span className="sr-only">Remove badge</span>
      </button>
    </span>
  )
}

export default Badge
