import { useState } from 'react'
import { Switch } from '@headlessui/react'

const Toggle = () => {
  const [enabled, setEnabled] = useState(false)

  return (
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-rebin-blue' : 'bg-rebin-grey'}
          relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
  )
}

export default Toggle;