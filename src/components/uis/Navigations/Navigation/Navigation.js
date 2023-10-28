import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'react-feather'

import { links } from '../../../../assets/constants/data'

const Navigation = () => {
  const [heading, setHeading] = useState('')
  const [subHeading, setSubHeading] = useState('')

  return (
    <>
      {links.map((link, index) =>(
        <div key={index}>
          <div className='px-1 text-left md:cursor-pointer group'>
            <h1 className='py-1 flex justify-between items-center md:pr-0 pr-5 group' onClick={() => heading !== link?.name ? setHeading(link?.name) : setHeading('')}>
              {link?.name}
              {link?.submenu && (
                <>
                  <span className='text-xl md:hidden inline'>{heading === link?.name ? <ChevronUp /> : <ChevronDown />}</span>
                  <span className='text-xl md:mt-1 md:ml-2 inline md:block hidden group-hover:rotate-180 group-hover:-mt-2'><ChevronDown /></span>
                </>
              )}
            </h1>
            {link?.submenu && (
              <div>
                <div className='absolute top-401 z-50 hidden group-hover:md:block hover:md:block'>
                  <div className='py-5'>
                    <div className='w-4 h-4 left-3 absolute mt-4 bg-gray-800 rotate-45'></div>
                  </div>
                  <div className='bg-gray-800 border shadow-lg p-5 grid grid-cols-3 gap-10 rounded text-gray-200'>
                    {link?.sublinks?.map((mysublinks, index) =>(
                      <div key={index}>
                        <h1 className='text-lg font-semibold uppercase text-teal-500'>{mysublinks?.Head}</h1>
                        {mysublinks?.sublink?.map((slink, index) =>(
                          <li className='text-sm text-gray-100 my-2.5' key={index}>
                            <Link to={slink?.link} className='hover:text-teal-500'>{slink?.name}</Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* mobile menus */}
          <div className={`${heading === link?.name ? 'md:hidden' : 'hidden'}`}>
            {link?.sublinks?.map((slinks, index) =>(
              <div key={index}>
                <div>
                  <h1 onClick={() => subHeading !== slinks?.Head ? setSubHeading(slinks?.Head) : setSubHeading('')} className='py-1 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center md:pr-0 pr-8'>
                    {slinks?.Head}
                    <span className='text-xl md:mt-1 md:ml-2 inline'>{subHeading === slinks?.Head ? <ChevronUp /> : <ChevronDown />}</span>
                  </h1>
                  <div className={`${subHeading === slinks?.Head ? 'md:hidden' : 'hidden'}`}>
                    {slinks?.sublink?.map((slink, index) =>(
                      <li key={index} className='py-1 px-14'>
                        <Link to={slink?.link} className='hover:text-teal-500'>{slink?.name}</Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default Navigation