import { ChangeEvent, Fragment, useCallback, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import * as GraphHopper from './../../services/http/graphhopper/endpoints'
import useDebounce from '../../hooks/useDebounce'
import { GeocodingLocation } from '../../services/http/graphhopper/types'
import { GeocodeInputProps } from './types'

export const nameConverter = (location: GeocodingLocation): string =>
  [
    location.name,
    location.street,
    location.housenumber,
    location.city,
    location.postcode,
    location.state,
    location.country,
    location.countrycode,
  ]
    .filter(Boolean)
    .join(', ')

const GeocodeInput: React.FC<GeocodeInputProps> = (props) => {
  const [selected, setSelected] = useState<GeocodingLocation>()
  const [foundLocations, setFoundLocations] = useState<GeocodingLocation[]>([])
  const [query, setQuery] = useState<string>('')
  const debouncedValue = useDebounce<string>(query, 400)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }, [])

  useEffect(() => {
    debouncedValue &&
      GraphHopper.Geocode({ q: debouncedValue }).then((res) =>
        setFoundLocations(res.data.hits)
      )
  }, [debouncedValue])

  const handleSelect = useCallback((selection: GeocodingLocation) => {
    setSelected(selection)
    props.onSelectLocation?.(selection)
  }, [])

  return (
    <div className={props.className}>
      <Combobox value={selected} onChange={handleSelect}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none "
              displayValue={(location: any) => location?.name}
              onChange={handleChange}
              placeholder={props.placeholder}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-[999] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {foundLocations.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Sonuç bulunamadı
                </div>
              ) : (
                foundLocations.map((location: GeocodingLocation) => (
                  <Combobox.Option
                    key={location?.osm_id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-4  text-left ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={location}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {nameConverter(location)}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
export default GeocodeInput
