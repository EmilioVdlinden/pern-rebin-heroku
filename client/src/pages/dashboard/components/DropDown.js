import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


const DropDown = () => {

  const areas = [
    { name: 'General' },
  ]

  const [selected, setSelected] = useState(areas[0])
  
  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-4 pl-3 pr-10 text-left shadow-md">
            <span className="block font-bold text-rebin-grey text-xs ">Select region</span>
            <span className="block text-rebin-darkblue text-lg font-semibold truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-black"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {areas.map((area, areaIndx) => (
              <Listbox.Option
                key={areaIndx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-rebin-light-blue cursor-pointer': 'text-gray-900'
                  }`
                }
                value={area}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {area.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-rebin-blue">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )
}

export default DropDown;